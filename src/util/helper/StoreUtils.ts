import { createTransform } from "redux-persist";
import { store } from "@/store";

// Enhanced type definitions
type SerializedFunction = {
    __serializedFunction__: true;
    source: string;
    context?: Record<string, unknown>;
};

type DeserializationDependencies = {
    dispatch: typeof store.dispatch;
    store: typeof store;
    console: Console;
    [key: string]: unknown;
};

export class StoreUtils {
    private static readonly SERIALIZED_FUNCTION_KEY = "__serializedFunction__" as const;

    // Type guard for serialized function
    private static isSerializedFunction(obj: unknown): obj is SerializedFunction {
        return (
            typeof obj === "object" &&
            obj !== null &&
            (obj as SerializedFunction)[this.SERIALIZED_FUNCTION_KEY] === true &&
            typeof (obj as SerializedFunction).source === "string"
        );
    }

    // Enhanced function serializer
    static functionSerializer = createTransform<Record<string, unknown>, Record<string, unknown>>(
        // Serialization (outbound)
        (inboundState) => {
            const serializedState: Record<string, unknown> = {};

            Object.keys(inboundState).forEach((stateKey) => {
                const value = inboundState[stateKey];

                // Handle function serialization
                if (typeof value === "function") {
                    serializedState[stateKey] = {
                        [this.SERIALIZED_FUNCTION_KEY]: true,
                        source: value.toString(),
                        context: this.extractFunctionContext(value as any)
                    };
                }
                // Handle deep object/array serialization
                else if (value && typeof value === "object") {
                    serializedState[stateKey] = this.deepSerialize(value);
                } else {
                    serializedState[stateKey] = value;
                }
            });

            return serializedState;
        },
        // Deserialization (inbound)
        (outboundState) => {
            const deserializedState: Record<string, unknown> = {};

            Object.keys(outboundState).forEach((stateKey) => {
                const value = outboundState[stateKey];

                // Restore serialized functions
                if (this.isSerializedFunction(value)) {
                    try {
                        // Create a more comprehensive dependencies object
                        const dependencies: DeserializationDependencies = {
                            dispatch: this.getDispatch(),
                            store: store,
                            console: console,
                            ...(value.context || {})
                        };

                        // Use a more type-safe approach to function recreation
                        const recreatedFunction = this.createFunctionFromSource(
                            value.source,
                            dependencies
                        );

                        deserializedState[stateKey] = recreatedFunction;
                    } catch (error) {
                        console.error("Failed to deserialize function:", error);
                        deserializedState[stateKey] = null;
                    }
                }
                // Handle deep object/array deserialization
                else if (value && typeof value === "object") {
                    deserializedState[stateKey] = this.deepDeserialize(value);
                } else {
                    deserializedState[stateKey] = value;
                }
            });

            return deserializedState;
        }
    );

    // Type-safe function creation from source
    private static createFunctionFromSource(
        source: string,
        dependencies: DeserializationDependencies
    ): (...args: unknown[]) => unknown {
        // Extract dependencies for context
        const dependencyNames = Object.keys(dependencies);
        const dependencyValues = dependencyNames.map(name => dependencies[name]);

        // Create a function that includes dependencies in its scope
        return new Function(
            ...dependencyNames,
            `return (${source}).apply(this, arguments);`
        )(...dependencyValues);
    }

    // Attempt to extract function context and external dependencies
    private static extractFunctionContext(func: (...args: unknown[]) => unknown): Record<string, unknown> {
        const context: Record<string, unknown> = {};

        try {
            // Use a more sophisticated approach to capture potential external references
            const funcStr = func.toString();

            // Simple regex to find potential external variable references
            const variableRegex = /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\b/g;
            const reservedKeywords = [
                'function', 'return', 'const', 'let', 'var', 'if', 'else',
                'for', 'while', 'do', 'switch', 'case', 'break', 'continue'
            ];

            const matches = funcStr.match(variableRegex) || [];

            matches
                .filter(match =>
                    !reservedKeywords.includes(match) &&
                    !funcStr.includes(`function ${match}`) &&
                    !funcStr.includes(`const ${match}`) &&
                    !funcStr.includes(`let ${match}`) &&
                    !funcStr.includes(`var ${match}`)
                )
                .forEach(varName => {
                    try {
                        // Attempt to capture the value of external variables
                        // Be cautious with this approach
                        const value = (globalThis as Record<string, unknown>)[varName];
                        if (value !== undefined) {
                            context[varName] = value;
                        }
                    } catch {
                        // Silently fail if we can't capture the variable
                    }
                });
        } catch (error) {
            console.warn("Could not extract function context:", error);
        }

        return context;
    }

    // Deep serialization method
    static deepSerialize<T>(obj: T): unknown {
        if (obj === null || typeof obj !== "object") return obj;

        if (Array.isArray(obj)) {
            return obj.map((item) => this.deepSerialize(item));
        }

        const serializedObj: Record<string, unknown> = {};

        Object.keys(obj).forEach((key) => {
            const value = (obj as Record<string, unknown>)[key];

            // Handle function serialization within nested objects
            if (typeof value === "function") {
                serializedObj[key] = {
                    [this.SERIALIZED_FUNCTION_KEY]: true,
                    source: value.toString(),
                    context: this.extractFunctionContext(value as any)
                };
            }
            // Recursively serialize nested objects and arrays
            else if (value && typeof value === "object") {
                serializedObj[key] = this.deepSerialize(value);
            } else {
                serializedObj[key] = value;
            }
        });

        return serializedObj;
    }

    // Deep deserialization method
    static deepDeserialize<T>(obj: unknown): unknown {
        if (obj === null || typeof obj !== "object") return obj;

        if (Array.isArray(obj)) {
            return obj.map((item) => this.deepDeserialize(item));
        }

        const deserializedObj: Record<string, unknown> = {};

        Object.keys(obj).forEach((key) => {
            const value = (obj as Record<string, unknown>)[key];

            // Restore serialized functions
            if (this.isSerializedFunction(value)) {
                try {
                    const dependencies: DeserializationDependencies = {
                        dispatch: this.getDispatch(),
                        store: store,
                        console: console,
                        ...(value.context || {})
                    };

                    deserializedObj[key] = this.createFunctionFromSource(
                        value.source,
                        dependencies
                    );
                } catch (error) {
                    console.error("Failed to deserialize function:", error);
                    deserializedObj[key] = null;
                }
            }
            // Recursively deserialize nested objects and arrays
            else if (value && typeof value === "object") {
                deserializedObj[key] = this.deepDeserialize(value);
            } else {
                deserializedObj[key] = value;
            }
        });

        return deserializedObj;
    }

    // Get dispatch directly from the store
    private static getDispatch(): typeof store.dispatch {
        return store.dispatch;
    }
}