import { LinkButtonRendererComponent } from "src/_renderers/link-button-renderer/link-button-renderer.component";
import { EditButtonRendererComponent } from "src/_renderers/edit-button-renderer/edit-button-renderer.component";

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
    },
    {
        headerName: 'View',
        field: 'slug',
        cellRenderer: LinkButtonRendererComponent,
        cellRendererParams:  { },
        maxWidth: 100
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
        headerName: 'View',
        field: 'slug',
        cellRenderer: LinkButtonRendererComponent,
        cellRendererParams:  { },
        maxWidth: 100
    },
    {
        headerName: 'Edit',
        field: 'slug',
        cellRenderer: EditButtonRendererComponent,
        cellRendererParams:  { },
        maxWidth: 100
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
        headerName: 'Work Phone',
        valueFormatter: function (params:any) {
            const phoneNumber = params.value;
            if (/^\+\d{11}$/.test(phoneNumber)) {
                const formattedPhoneNumber = `(${phoneNumber.substr(2, 3)}) ${phoneNumber.substr(5, 3)}-${phoneNumber.substr(8)}`;
                return formattedPhoneNumber;
            } else {
                return ''; // Return empty string for unexpected formats
            }
        }
    },
    // {
    //     field: 'profile.mobile_phone',
    //     headerName: 'Mobile Phone'
    // },
    {
        headerName: 'View',
        field: 'id',
        cellRenderer: LinkButtonRendererComponent,
        cellRendererParams:  { }
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
    },
    {
        headerName: 'View',
        field: 'slug',
        cellRenderer: LinkButtonRendererComponent,
        cellRendererParams:  { },
        maxWidth: 100
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