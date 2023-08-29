import { ColDef } from 'ag-grid-community';

export function getColumnDefs(routeType: string) {
    switch (routeType) {
        case 'department':
        case 'division':
            return divisionColDefs;
        case 'project':
            return projectColDefs;
        case 'users':
            return usersColDefs;
        case 'image':
            return imageColDefs;
        default:
            return;
    }
}

const divisionColDefs = [
    {
        field: 'name',
        headerName: 'Name'
    },
    {
        field: 'description',
        headerName: 'Description'
    },
    {
        field: 'manager.full_name',
        headerName: 'Manager'
    },
    {
        field: 'deputy.full_name',
        headerName: 'Deputy'
    },
    {
        field: 'assistant.full_name',
        headerName: 'Assistant'
    },
    {
        field: 'staff',
        headerName: 'Staff'
    }
];

const projectColDefs = [
    {
        field: 'name',
        headerName: 'Name'
    },
    {
        field: 'description',
        headerName: 'Description'
    },
    {
        field: 'project_leader',
        headerName: 'Project Leaders'
    }
];


const usersColDefs = [
    {
        field: 'full_name',
        headerName: 'Name'
    },
    {
        field: 'email',
        headerName: 'Email'
    },
    {
        field: 'profile.title',
        headerName: 'Title'
    },
    {
        field: 'profile.work_phone',
        headerName: 'Work Phone'
    },
    {
        field: 'profile.mobile_phone',
        headerName: 'Mobile Phone'
    }
];


const imageColDefs = [
    {
        field: 'name',
        headerName: 'Name'
    },
    {
        field: 'description',
        headerName: 'Description'
    },
    {
        field: 'photographer',
        headerName: 'Photographer'
    },
    {
        field: 'photo_date',
        headerName: 'Photo Date'
    },
    {
        field: 'source',
        headerName: 'Source'
    }
];

// function transformArray(inputArray: string[]): ColDef[] {
//     return inputArray.map(item => ({ field: item }));
// }