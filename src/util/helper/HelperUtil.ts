import * as XLSX from "xlsx";
import {saveAs} from "file-saver";
import {Dispatch} from "redux";

interface Row {
    [key: string]: string;
}
export class HelperUtil {
   static  formatTimestamp(timestamp) {
        // Parse the input timestamp
        const date = new Date(timestamp);

        // Define an array of month names
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        // Get the components
        const month = monthNames[date.getMonth()];
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();

        // Format hours and minutes for 12-hour clock
        const formattedHours = hours % 12 || 12; // Convert to 12-hour format, treating 0 as 12
        const amPm = hours < 12 ? "AM" : "PM";
        const formattedMinutes = minutes.toString().padStart(2, "0");

        // Construct the formatted string
        return `${month} ${day}, ${formattedHours}:${formattedMinutes} ${amPm}`;
    }

    static formatTime(dateTimeString: string) {
        // Create a new Date object from the input string
        const date = new Date(dateTimeString);

        // Get hours and minutes
        let hours = date.getHours();
        const minutes = date.getMinutes();

        // Determine AM or PM
        const ampm = hours >= 12 ? 'PM' : 'AM';

        // Convert hours to 12-hour format
        hours = hours % 12;
        hours = hours ? hours : 12; // if hours is 0, set it to 12 (for midnight)

        // Format minutes as two digits
        const minutesFormatted = minutes < 10 ? '0' + minutes : minutes;

        // Return formatted time
        return `${hours}:${minutesFormatted} ${ampm}`;
    }

    static convertDate = (dateString: string) => {
        const date = new Date(dateString);

        // Options for formatting the date
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };

        // Convert the date to the desired format
        return date.toLocaleDateString('en-US', options);
    };
    static exportToExcel = (dispatch: Dispatch, data: any[], fileName: string, handleClose: ()=>void) => {
        // Create a new workbook and a new worksheet
        if (data.length !== 0){
            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.json_to_sheet(data);

            // Add the worksheet to the workbook
            XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

            // Convert the workbook to a binary array
            const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

            // Create a blob and use file-saver to save it
            const blob = new Blob([wbout], { type: 'application/octet-stream' });
            saveAs(blob, fileName);
        }
    };

    static replaceEmptyStringWithNull = (obj) => {
        for (const key in obj) {
            if (obj[key] === "") {
                obj[key] = null;
            }
        }
        return obj;
    };
    static getRandomInt(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static paginate(totalCount: number, requestedPage = 1, requestedPageSize = 10) {
        //todo Calculate total pages
        const totalPages = Math.ceil(totalCount / requestedPageSize);
        //todo Ensure the current page is within the valid range
        const currentPage = Math.max(1, Math.min(requestedPage, totalPages));
        //todo Set the page size
        const pageSize = requestedPageSize;

        return {
            totalPages,
            currentPage,
            pageSize,
        };
    }

    static isValidUrl = (url: string) => {
        const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])?)\\.)+([a-z]{2,}|[a-z\\d-]{2,})|' + // domain name
            'localhost|' + // localhost
            '\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}|' + // IPv4
            '\\[([0-9a-f]{1,4}:){7,7}[0-9a-f]{1,4}\\]|' + // IPv6
            '([0-9a-f]{1,4}:){1,7}:|'+ // IPv6
            '([0-9a-f]{1,4}:){1,6}:[0-9a-f]{1,4}|'+ // IPv6
            '([0-9a-f]{1,4}:){1,5}(:[0-9a-f]{1,4}){1,2}|'+ // IPv6
            '([0-9a-f]{1,4}:){1,4}(:[0-9a-f]{1,4}){1,3}|'+ // IPv6
            '([0-9a-f]{1,4}:){1,3}(:[0-9a-f]{1,4}){1,4}|'+ // IPv6
            '([0-9a-f]{1,4}:){1,2}(:[0-9a-f]{1,4}){1,5}|'+ // IPv6
            '[0-9a-f]{1,4}:((:[0-9a-f]{1,4}){1,6})|'+ // IPv6
            ':((:[0-9a-f]{1,4}){1,7}|:)|'+ // IPv6
            'fe80:(:[0-9a-f]{0,4}){0,4}%[0-9a-zA-Z]{1,}|'+ // IPv6
            '::(ffff(:0{1,4}){0,1}:){0,1}' + // IPv6
            '((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\\.){3}' + // IPv4
            '(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])|' + // IPv4
            '([0-9a-f]{1,4}:){1,7}:)' + // IPv6
            '(\\:\\d+)?(\\/[-a-z\\d%@_.~+&:]*)*' + // Port
            '(\\?[;&a-z\\d%@_.,~+&:]*)?' + // Query
            '(\\#[-a-z\\d_]*)?$','i'); // Fragment

        return !!pattern.test(url);
    };

    static replacePlaceholders(template: string, values: any) {
        return template?.replace(/\[([^\]]+)\]/g, (match: string, key: string): string => {
            const lowerCaseKey = key.toLowerCase();
            const lowerCaseValues = Object.fromEntries(
                Object.entries(values).map(([k, v]) => [k.toLowerCase(), v])
            );
            return lowerCaseValues[lowerCaseKey] !== undefined ? String(lowerCaseValues[lowerCaseKey]) : match;
        });
    }

    static replacePlaceholdersAndCalc (template, values){
        return template?.replace(/(\d+)?\s*([\+\-\*\/])?\s*\[([^\]]+)\](\s*([\+\-\*\/])?\s*(\d+))?/g, (match, numberBefore, operatorBefore, key, _, operatorAfter, numberAfter) => {
            // let value = values[key] !== undefined ? values[key] : match;
            const lowerCaseKey = key.toLowerCase();
            const lowerCaseValues = Object.fromEntries(Object.entries(values).map(([k, v]) => [k.toLowerCase(), v]));
            let value = lowerCaseValues[lowerCaseKey] !== undefined ? lowerCaseValues[lowerCaseKey] : match;

            let expression = '';
            if (numberBefore && operatorBefore) {
                expression = `${numberBefore} ${operatorBefore} ${value}`;
            } else if (operatorAfter && numberAfter) {
                expression = `${value} ${operatorAfter} ${numberAfter}`;
            }

            if (expression) {
                try {
                    const operationFunction = new Function('return ' + expression);
                    value = operationFunction();
                } catch (error) {
                    console.error(`Error evaluating expression: ${expression}`, error);
                }
            }

            return value;
        });
    }

    static modalFunction(name: string){
        return document.getElementById(name) as HTMLDialogElement
    }

    static parseCSV (csvText: any) {
        const lines = csvText.split('\n');
        const headers = lines[0].split(',').map((header: string) => header.trim());
        const data = [];

        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',');
            if (values.length === headers.length) {
                const row: Row = {};
                for (let j: number = 0; j < headers.length; j++) {
                    row[headers[j]] = values[j].trim();
                }
                data.push(row);
            }
        }

        return data;
    }

    static flattenObject  (obj: any, parentKey = '', separator = '.'){
        const result: Record<string, any> = {};

        for (const [key, value] of Object.entries(obj)) {
            const newKey = parentKey ? `${parentKey}${separator}${key}` : key;

            if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                Object.assign(result, HelperUtil.flattenObject(value, newKey, separator));
            } else if (Array.isArray(value)) {
                value.forEach((item, index) => {
                    if (typeof item === 'object' && item !== null) {
                        Object.assign(result, HelperUtil.flattenObject(item, `${newKey}[${index}]`, separator));
                    } else {
                        result[`${newKey}[${index}]`] = item;
                    }
                });
            } else {
                result[newKey] = value;
            }
        }

        return result;
    }

    static flattenObjectWithValidation(obj: any, parentKey = '', separator = '.') {
        const result: Record<string, any> = {};

        for (const [key, value] of Object.entries(obj)) {
            const newKey = parentKey ? `${parentKey}${separator}${key}` : key;

            let parsedValue = value;

            // Check if the value is a string and try to parse it as JSON
            if (typeof value === 'string') {
                try {
                    parsedValue = JSON.parse(value);
                } catch (e) {
                    // If JSON.parse fails, retain the original string value
                    parsedValue = value;
                }
            }

            // After parsing, handle the value based on its type
            if (typeof parsedValue === 'object' && parsedValue !== null && !Array.isArray(parsedValue)) {
                // If it's an object, recursively flatten it
                Object.assign(result, HelperUtil.flattenObject(parsedValue, newKey, separator));
            } else if (Array.isArray(parsedValue)) {
                // If it's an array, iterate through it and flatten each element
                parsedValue.forEach((item, index) => {
                    if (typeof item === 'object' && item !== null) {
                        Object.assign(result, HelperUtil.flattenObject(item, `${newKey}[${index}]`, separator));
                    } else {
                        result[`${newKey}[${index}]`] = item;
                    }
                });
            } else {
                // If it's neither an object nor an array, add it to the result as is
                result[newKey] = parsedValue;
            }
        }

        return result;
    }

    static isObject(item) {
        return (item && typeof item === 'object' && !Array.isArray(item));
    }

    static flattenComplicatedObject(ob: any) {
        const result = {};

        for (const i in ob) {
            if (Object.prototype.hasOwnProperty.call(ob, i)) {
                if (HelperUtil.isObject(ob[i])) {
                    const temp = HelperUtil.flattenObject(ob[i]);
                    for (const j in temp) {
                        result[i + '.' + j] = temp[j];
                    }
                } else {
                    result[i] = ob[i];
                }
            }
        }
        return result;
    }

    static deepFlattenArray(arr) {
        const result = {};

        arr.forEach(item => {
            const { key, value } = item;

            let parsedValue = value;
            try {
                parsedValue = JSON.parse(value);
            } catch (e) {
                // Value is not a JSON string, keep it as is
            }

            if (HelperUtil.isObject(parsedValue) || Array.isArray(parsedValue)) {
                const flattened = HelperUtil.flattenObject(parsedValue);
                for (const subKey in flattened) {
                    if (Object.prototype.hasOwnProperty.call(flattened, subKey)) {
                        result[`${key}.${subKey}`] = flattened[subKey];
                    }
                }
            } else {
                result[key] = parsedValue;
            }
        });

        return result;
    }

    static  getKeyFromPath (path: string) {
        const parts = path.split('.');
        return parts[parts.length - 1];
    }

    static flattenObjectWithoutParent (obj: any, parentKey = '') {
        const result: Record<string, any> = {};

        for (const [key, value] of Object.entries(obj)) {
            const newKey = parentKey ? `${parentKey}.${key}` : key;

            if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                Object.assign(result, HelperUtil.flattenObject(value, newKey));
            } else if (Array.isArray(value)) {
                value.forEach((item, index) => {
                    if (typeof item === 'object' && item !== null) {
                        Object.assign(result, HelperUtil.flattenObject(item, `${newKey}[${index}]`));
                    } else {
                        result[`${newKey}[${index}]`] = item;
                    }
                });
            } else {
                result[newKey] = value;
            }
        }

        // Filter result to only include the deepest keys
        const filteredResult: Record<string, any> = {};
        for (const key in result) {
            const parts = key.split('.');
            const deepestKey = parts[parts.length - 1];
            filteredResult[deepestKey] = result[key];
        }

        return filteredResult;
    }

    static formatString = (str: string) => {
        return str
            ?.split(' ')
            ?.map((word, index) => (index === 0 ? word : word[0]))
            ?.join(' ');
    };
    static convertArrayOfObjectToObject(value: any[]) {
       return  value?.reduce((acc: { [key: string]: any[] }, obj: any) => {
            Object.keys(obj).forEach((key) => {
                acc[key] = obj[key];
            });
            return acc;
        }, {});
    }
    static colorPaletteFromEnv(paletteString: string): any{
        const colorPalette = {};
        const entries = paletteString.split(/,(?![^(]*\))/g);

        entries.forEach(entry => {
            const [key, value] = (entry ?? "").split(/:(.+)/);
            colorPalette[key.trim()] = value?.trim();
        });

        return colorPalette;
    }

/*
    static mergeObjectsWithoutOverride(...objects: any[]): any {
        const result = {};
        for (const obj of objects) {
            for (const [key, value] of Object.entries(obj || {})) {
                if (key in result) {
                    if (Array.isArray(result[key])) {
                        result[key] = [...result[key], value];
                    } else {
                        result[key] = [result[key], value];
                    }
                } else {
                    result[key] = value;
                }
            }
        }

        return result;
    }

    */

    static mergeObjectsWithoutOverride(...objects: any[]): any {
        const result: any = {};
        for (const obj of objects) {
            for (const [key, value] of Object.entries(obj || {})) {
                if (key in result) {
                    if (Array.isArray(result[key])) {
                        result[key] = Array.isArray(value)
                            ? [...result[key], ...value]
                            : [...result[key], value];
                    } else {
                        result[key] = Array.isArray(value)
                            ? [result[key], ...value]
                            : [result[key], value];
                    }
                } else {
                    result[key] = value;
                }
            }
        }

        return result;
    }

    static paginationToolkit<S,>(currentPage: number, totalCount: number,pageSize: number|string,  data: S[]){
        const totalPages = Math.ceil(totalCount / Number(pageSize));
        const startIndex = (currentPage - 1) * Number(pageSize);
        const endIndex = startIndex + Number(pageSize);
        const currentItems = data?.slice(startIndex, endIndex);
        return {totalPages, currentItems}
    }

}
