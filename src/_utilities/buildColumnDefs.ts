import { ColDef } from 'ag-grid-community';

// this is a great function for viewing/exporting data - but not for validation/editing.
export function buildColumnDefs(data: any[]): ColDef[] {
    if (!data || data.length === 0) {
        return [];
    }

    // Get the keys from the first object in the data array
    const firstRecord = data[0];
    return Object.keys(firstRecord).map((key) => ({
        field: key,
        headerName: formatHeaderName(key)
    }));
}

// Optional helper function to format the header names
function formatHeaderName(key: string): string {
    // This will convert "ActivityDate" to "Activity Date", for example
    return key.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/_/g, ' ');
}
