import { LinkButtonRendererComponent } from "src/_renderers/link-button-renderer/link-button-renderer.component";

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
        // type:
        // width:
        // editable:
        // filter:
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
        field: 'staff_names',
        headerName: 'Staff',
        valueGetter: getStaffNames
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
        field: 'project_leader_names',
        headerName: 'Project Leaders',
        valueGetter: getProjectLeaderNames
    },
    {
        headerName: 'ViewBySlug',
        field: 'slug',
        cellRenderer: LinkButtonRendererComponent,
        cellRendererParams:  { }
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
        headerName: 'Photo Date',
        type: 'dateColumn'
    },
    {
        field: 'source',
        headerName: 'Source'
    }
];

// function transformArray(inputArray: string[]): ColDef[] {
//     return inputArray.map(item => ({ field: item }));
// }

// Function to extract and concatenate project leader names
function getProjectLeaderNames(params: any) {
    if (params.data.project_leader && Array.isArray(params.data.project_leader)) {
        const leaderNames = params.data.project_leader.map((leader: any) => leader.full_name);
        return leaderNames.join(', ');
    }
    return '';
}

function getStaffNames(params: any) {
    if (params.data.staff && Array.isArray(params.data.staff)) {
        const staffNames = params.data.staff.map((staff: any) => staff.full_name);
        return staffNames.join(', ');
    }
    return '';
}