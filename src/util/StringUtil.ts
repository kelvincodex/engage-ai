import {useLocation} from "react-router-dom";
type SortType = 'date' | 'number' | 'string';

export class StringUtil {
    static dynamicSort<T>(array: T[], key: keyof T, type: SortType = 'string'): T[] {
        if (!array || array.length === 0) return [];

        return [...array].sort((a, b) => {
            const valueA = a[key];
            const valueB = b[key];

            switch (type) {
                case 'date':
                    return new Date(valueB as string).getTime() - new Date(valueA as string).getTime();
                case 'number':
                    // return (valueB as number) - (valueA as number);
                    return Number(valueB) - Number(valueA);
                case 'string':
                default:
                    return (valueB as string).localeCompare(valueA as string);
            }
        });
    }

    static dynamicADSort<T>(array: T[], key: keyof T, type: SortType = 'string'): T[] {
        if (!array || array.length === 0) return [];

        return [...array].sort((a, b) => {
            const valueA = a[key];
            const valueB = b[key];

            switch (type) {
                case 'date': {
                    const dateA = new Date(valueA as string).getTime();
                    const dateB = new Date(valueB as string).getTime();
                    return dateB - dateA;
                }
                case 'number': {
                    const numA = Number(valueA ?? 0);
                    const numB = Number(valueB ?? 0);
                    return numA - numB; // Ascending order
                }
                case 'string': {
                    return (valueA ?? '').toString().localeCompare((valueB ?? '').toString());
                }
                default:
                    return 0; // No sorting for unknown types
            }
        });
    }


    static doesUrlEndWith(suffix: string, url: string = window.location.href) {
        console.log(url.endsWith(suffix))
        return url.endsWith(suffix);
    }

    static useUrlSuffix(suffixes: string[]) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const location = useLocation();
        // return location.pathname.endsWith(suffix) || location.hash.endsWith(suffix);
        // const location = useLocation();
        return suffixes.some(suffix => location.pathname.endsWith(suffix) || location.hash.endsWith(suffix));
    }

    static toTitleCase(sentence: string) {
        // Split the input string into sentences
        const words = sentence?.split(" ");

        // Capitalize the first letter of each sentence
        const titleCase = words?.map((word) => {
            // Capitalize the first letter of the sentence
            const firstLetter = word.charAt(0).toUpperCase();
            // Concatenate the capitalized first letter with the rest of the word
            return firstLetter + word.slice(1).toLowerCase();
        });
        // Join the sentences back together with a period and space
        const result = titleCase.join(" ");
        // console.log(result);
        return result;
    }

    static convertToSentenceCase(input: string): string {
        // Check if the input is in camelCase or snake_case format
        const isCamelCase = /[a-z][A-Z]/.test(input);
        const isSnakeCase = /_/.test(input);

        if (!isCamelCase && !isSnakeCase) {
            return this.toTitleCase(input); // Return the original string if it isn't camelCase or snake_case
        }

        let result = input;

        // Convert snake_case to spaces
        if (isSnakeCase) {
            result = result.replace(/_/g, ' ');
        }

        // Convert camelCase to spaces
        if (isCamelCase) {
            result = result.replace(/([a-z])([A-Z])/g, '$1 $2');
        }

        // Capitalize the first letter of the sentence
        result = result.replace(/^./, str => str.toUpperCase());

        return this.toTitleCase(result);
    }

    static ultimateRemoveWordFromASentence(sentence: string, wordToRemove: string){
       return  sentence.replace(new RegExp(`\\b${wordToRemove}\\b`, 'g'), '').replace(/\s{2,}/g, ' ').trim()
    }
}
