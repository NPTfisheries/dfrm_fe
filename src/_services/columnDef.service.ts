import { LinkButtonRendererComponent } from "src/_renderers/link-button-renderer/link-button-renderer.component";
import { EditButtonRendererComponent } from "src/_renderers/edit-button-renderer/edit-button-renderer.component";
import { ImagePreviewRendererComponent } from "src/_renderers/image-preview-renderer/image-preview-renderer.component";

import { professionalAccess, managerAccess, projectleaderAccess } from "src/_utilities/permission-util";
import { formatPhone } from "src/_utilities/formatPhone";

export function getColumnDefs(routeType: string, context: any) {
    console.log('GetColumnDefs routeType:', routeType);
    switch (routeType) {
        case 'department':
            return departmentColDefs(routeType, context);
        case 'division':
            return divisionColDefs(routeType, context);
        case 'project':
            return projectColDefs(routeType, context);
        case 'users':
            return usersColDefs(routeType, context);
        case 'image':
            return imageColDefs(routeType, context);
        case 'facility':
            return facilityColDefs(routeType, context);
        default:
            return;
    }
}

function departmentColDefs(routeType: string, context: any) {
    const columns: any[] = [
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

    if (managerAccess(context.permissionGroup)) {
        columns.push({
            headerName: 'Edit',
            field: 'slug',
            cellRenderer: EditButtonRendererComponent,
            cellRendererParams: {
                routeType: routeType,
                context: context
            },
            maxWidth: 100
        });
    }

    return columns;

}

function divisionColDefs(routeType: string, context: any) {
    const columns: any[] = [
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
            cellRendererParams: {},
            maxWidth: 100
        }
    ];

    if (managerAccess(context.permissionGroup)) {
        columns.push({
            headerName: 'Edit',
            field: 'slug',
            cellRenderer: EditButtonRendererComponent,
            cellRendererParams: {
                routeType: routeType,
                context: context
            },
            maxWidth: 100
        });
    }

    return columns;

}

function projectColDefs(routeType: string, context: any) {
    const columns: any[] = [
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
            cellRendererParams: {},
            maxWidth: 100
        }
    ];

    if (projectleaderAccess(context.permissionGroup)) {
        columns.push({
            headerName: 'Edit',
            field: 'slug',
            cellRenderer: EditButtonRendererComponent,
            cellRendererParams: {
                routeType: routeType,
                context: context
            },
            maxWidth: 100
        });
    }

    return columns;

}

function usersColDefs(routeType: string, context: any) {
    const columns: any[] = [
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
            valueFormatter: function (params: any) {
                const phoneNumber = params.value;
                return formatPhone(phoneNumber);
            }
        },
        {
            headerName: 'View',
            field: 'id',
            cellRenderer: LinkButtonRendererComponent,
            cellRendererParams: {},
            maxWidth: 100
        }
    ];

    return columns;

}


function imageColDefs(routeType: string, context: any) {
    const columns: any[] = [
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
            headerName: 'Preview',
            field: 'slug',
            cellRenderer: ImagePreviewRendererComponent,
            cellRendererParams: {},
            maxWidth: 100
        }
    ];

    if (managerAccess(context.permissionGroup)) {
        columns.push({
            headerName: 'Edit',
            field: 'slug',
            cellRenderer: EditButtonRendererComponent,
            cellRendererParams: {
                routeType: routeType,
                context: context
            },
            maxWidth: 100
        });
    }

    return columns;

}

function facilityColDefs(routeType: string, context: any) {
    const columns: any[] = [
        {
            field: 'properties.name',
            headerName: 'Name'
        },
        {
            field: 'properties.description',
            headerName: 'Description'
        },
        {
            field: 'properties.street_adress',
            headerName: 'Street Addresss'
        },
        {
            field: 'properties.mailing_address',
            headerName: 'Mailing Address'
        },
        {
            field: 'properties.city',
            headerName: 'City'
        },
        {
            field: 'properties.state',
            headerName: 'State'
        },
        {
            headerName: 'View',
            field: 'properties.slug',
            cellRenderer: LinkButtonRendererComponent,
            cellRendererParams: {},
            maxWidth: 100
        }
    ];

    if (managerAccess(context.permissionGroup)) {
        columns.push({
            headerName: 'Edit',
            field: 'properties.slug',
            cellRenderer: EditButtonRendererComponent,
            cellRendererParams: {
                routeType: routeType,
                context: context
            },
            maxWidth: 100
        });
    }

    return columns;

}

// Function to extract and concatenate project leader names
function getProjectLeaderNames(params: any) {
    if (params.data.project_leader && Array.isArray(params.data.project_leader)) {
        const leaderNames = params.data.project_leader.map((leader: any) => leader.full_name);
        return leaderNames.join(', ');
    }
    return '';
}

// .. or staff names
function getStaffNames(params: any) {
    if (params.data.staff && Array.isArray(params.data.staff)) {
        const staffNames = params.data.staff.map((staff: any) => staff.full_name);
        return staffNames.join(', ');
    }
    return '';
}