import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export class ExportUtil {
    //todo Export to Excel
    static exportToExcel<T>(data: T[], fileName: string) {
        if (data.length === 0) return;

        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

        const workbookBinary = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([workbookBinary], { type: 'application/octet-stream' });
        saveAs(blob, `${fileName}.xlsx`);
    }

    //todo Export to CSV
    static exportToCSV<T>(data: T[], fileName: string) {
        const csvContent = ExportUtil.generateCSV(data);
        if (!csvContent) return;

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, `${fileName}.csv`);
    }

    //todo Helper to generate CSV content
    private static generateCSV<T>(data: T[]): string {
        if (data.length === 0) return '';

        const headers = Object.keys(data[0]) as Array<keyof T>;
        const csvRows = [
            headers.join(','),  // Header row
            ...data.map(row =>
                headers.map(header => `"${(row as any)[header]}"`).join(',')
            ),  // Data rows
        ];

        return csvRows.join('\n');
    }
}
