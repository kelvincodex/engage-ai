import { createTransform } from 'redux-persist';
import localForage from 'localforage';

export class SerializationService {
    // Type for serialized function
    private static SERIALIZED_FUNCTION_KEY = '__serializedFunction__';

    // Type guard to check if an object is a serialized function
    private static isSerializedFunction(obj: any): boolean {
        return obj &&
            obj[this.SERIALIZED_FUNCTION_KEY] === true &&
            typeof obj.source === 'string';
    }

    // Deep serialization method
    private static deepSerialize<T>(obj: T): any {
        // Handle primitive types and null
        if (obj === null || typeof obj !== 'object') return obj;

        // Handle arrays
        if (Array.isArray(obj)) {
            return obj.map(item => this.deepSerialize(item));
        }

        const serializedObj: any = {};

        Object.keys(obj).forEach(key => {
            const value = (obj as any)[key];

            // Serialize functions
            if (typeof value === 'function') {
                serializedObj[key] = {
                    [this.SERIALIZED_FUNCTION_KEY]: true,
                    source: value.toString()
                };
            }
            // Recursively serialize nested objects
            else if (value && typeof value === 'object') {
                serializedObj[key] = this.deepSerialize(value);
            }
            else {
                serializedObj[key] = value;
            }
        });

        return serializedObj;
    }

    // Deep deserialization method
    private static deepDeserialize<T>(obj: any): T {
        // Handle primitive types and null
        if (obj === null || typeof obj !== 'object') return obj;

        // Handle arrays
        if (Array.isArray(obj)) {
            return obj.map(item => this.deepDeserialize(item)) as T;
        }

        const deserializedObj: any = {};

        Object.keys(obj).forEach(key => {
            const value = obj[key];

            // Restore serialized functions
            if (this.isSerializedFunction(value)) {
                try {
                    // eslint-disable-next-line no-new-func
                    deserializedObj[key] = new Function(`return ${value.source}`)();
                } catch (error) {
                    console.error('Failed to deserialize function:', error);
                    deserializedObj[key] = null;
                }
            }
            // Recursively deserialize nested objects
            else if (value && typeof value === 'object') {
                deserializedObj[key] = this.deepDeserialize(value);
            }
            else {
                deserializedObj[key] = value;
            }
        });

        return deserializedObj;
    }

    // Create a transform for Redux Persist
    public static createTransform<S = any>() {
        return createTransform<S, any>(
            // Serialization (outbound)
            (inboundState) => {
                if (inboundState === null || typeof inboundState !== 'object') {
                    return inboundState;
                }

                return this.deepSerialize(inboundState);
            },
            // Deserialization (inbound)
            (outboundState) => {
                if (outboundState === null || typeof outboundState !== 'object') {
                    return outboundState;
                }

                return this.deepDeserialize(outboundState);
            }
        );
    }

    // Create persistence configuration
    public static createPersistConfig<S = any>(options: {
        whitelist?: string[];
        blacklist?: string[];
        key?: string;
    } = {}) {
        return {
            key: options.key || 'root',
            storage: localForage,
            transforms: [this.createTransform<S>()],
            whitelist: options.whitelist,
            blacklist: options.blacklist
        };
    }

    // Utility method to safely serialize to JSON
    public static safeJsonSerialize(obj: any): string {
        return JSON.stringify(obj, (key, value) => {
            // Handle function serialization in JSON
            if (typeof value === 'function') {
                return {
                    [this.SERIALIZED_FUNCTION_KEY]: true,
                    source: value.toString()
                };
            }
            return value;
        });
    }

    // Utility method to safely parse JSON
    public static safeJsonParse(jsonString: string): any {
        return JSON.parse(jsonString, (key, value) => {
            // Restore serialized functions
            if (this.isSerializedFunction(value)) {
                try {
                    // eslint-disable-next-line no-new-func
                    return new Function(`return ${value.source}`)();
                } catch (error) {
                    console.error('Failed to deserialize function:', error);
                    return null;
                }
            }
            return value;
        });
    }
}

