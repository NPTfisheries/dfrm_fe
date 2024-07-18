import { LinkButtonRendererComponent } from "src/_renderers/link-button-renderer/link-button-renderer.component";
import { EditButtonRendererComponent } from "src/_renderers/edit-button-renderer/edit-button-renderer.component";
import { DeleteButtonRendererComponent } from "src/_renderers/delete-button-renderer/delete-button-renderer.component";
import { ImagePreviewRendererComponent } from "src/_renderers/image-preview-renderer/image-preview-renderer.component";
import { DocumentPreviewRendererComponent } from "src/_renderers/document-preview-renderer/document-preview-renderer.component";


import { ColDef, ColGroupDef } from "ag-grid-community";
import { professionalAccess, managerAccess, projectleaderAccess } from "src/_utilities/permission-util";
import { formatPhone } from "src/_utilities/formatPhone";

// COLUMN DEFINITIONS ARE FOR AG GRID

export function getColumnDefs(routeType: string, context: any) {
    // console.log('GetColumnDefs routeType:', routeType);
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
        case 'document':
            return documentColDefs(routeType, context);
        case 'facility':
            return facilityColDefs(routeType, context);
        default:
            let emptylist: ColDef[] = []
            return emptylist;
    }
}

const buttonProps = {
    filter: false,
    sortable: false,
    maxWidth: 80,
    minWidth: 80    
}

function departmentColDefs(routeType: string, context: any) {
    const columns: (ColDef | ColGroupDef)[] = [
        {
            field: 'name',
            headerName: 'Name'
            // type:
            // width:
            // editable:
            // filter:
        },
        // {
        //     field: 'description',
        //     headerName: 'Description'
        // },
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
            cellRenderer: LinkButtonRendererComponent,
            cellRendererParams: {},
            valueGetter: function(params: any) {
                // this will return all departments to the divisions list, but while it's only Fisheries that is fine.
                return '/divisions'; 
            },
            ...buttonProps
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
            ...buttonProps
        });
    }

    return columns;

}

function divisionColDefs(routeType: string, context: any) {
    const columns: (ColDef | ColGroupDef)[] = [
        {
            field: 'name',
            headerName: 'Name'
            // type:
            // width:
            // editable:
            // filter:
        },
        // {
        //     field: 'description',
        //     headerName: 'Description'
        // },
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
            ...buttonProps
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
            ...buttonProps
        });
    }

    return columns;

}

function projectColDefs(routeType: string, context: any) {
    const columns: (ColDef | ColGroupDef)[] = [
        {
            field: 'name',
            headerName: 'Name'
        },
        // {
        //     field: 'description',
        //     headerName: 'Description'
        // },
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
            ...buttonProps
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
            ...buttonProps
        });
    }

    return columns;

}

function usersColDefs(routeType: string, context: any) {
    const columns: (ColDef | ColGroupDef)[] = [
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
            },
            sortable: false,
            maxWidth: 170,
            minWidth: 170
        },
        {
            headerName: 'View',
            field: 'id',
            cellRenderer: LinkButtonRendererComponent,
            cellRendererParams: {},
            ...buttonProps
        }
    ];

    return columns;

}

function imageColDefs(routeType: string, context: any) {
    const columns: (ColDef | ColGroupDef)[] = [
        {
            field: 'name',
            headerName: 'Name *',
            tooltipField: 'description'
        },
        // {
        //     field: 'description',
        //     headerName: 'Description'
        // },
        {
            field: 'photographer',
            headerName: 'Photographer'
        },
        {
            field: 'photo_date',
            headerName: 'Photo Date',
            type: 'dateColumn',
            maxWidth: 150,
            minWidth: 150
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
            filter: false,
            sortable: false,
            maxWidth: 105,
            minWidth: 105
        }
    ];

    if (projectleaderAccess(context.permissionGroup)) {
        columns.push({
            headerName: 'Edit',
            field: 'id',
            cellRenderer: EditButtonRendererComponent,
            cellRendererParams: {
                routeType: routeType,
                context: context
            },
            ...buttonProps
        },
        {
            headerName: 'Delete',
            field: 'id',
            cellRenderer: DeleteButtonRendererComponent,
            cellRendererParams: {
                routeType: routeType,
                context: context
            },
            filter: false,
            sortable: false,
            maxWidth: 90,
            minWidth: 90,

        });
    }

    return columns;

}

function documentColDefs(routeType: string, context: any) {
    const columns: (ColDef | ColGroupDef)[] = [
        {
            field: 'title',
            headerName: 'Title *',
            tooltipField: 'description' // display desc. on hover
        },
        // {
        //     field: 'description',
        //     headerName: 'Description'
        // },
        {
            field: 'primary_author',
            headerName: 'Primary Author'
        },
        {
            field: 'employee_author_names',
            headerName: 'Employee Authors',
            valueGetter: getAuthorNames
        },
        {
            field: 'publish_date',
            headerName: 'Publish Date',
            type: 'dateColumn'
        },
        {
            field: 'document_type',
            headerName: 'Document Type'
        },
        {
            field: 'citation',
            headerName: 'Citation',
            tooltipField: 'citation'
        },
        {
            field: 'keywords',
            headerName: 'Keywords',
            tooltipField: 'keywords'
        },
        {
            headerName: 'View',
            field: 'document',
            cellRenderer: DocumentPreviewRendererComponent,
            cellRendererParams: {},
            ...buttonProps
        }
    ];

    if (professionalAccess(context.permissionGroup)) {
        columns.push({
            headerName: 'Edit',
            field: 'id',
            cellRenderer: EditButtonRendererComponent,
            cellRendererParams: {
                routeType: routeType,
                context: context
            },
            ...buttonProps

        },
        {
            headerName: 'Delete',
            field: 'id',
            cellRenderer: DeleteButtonRendererComponent,
            cellRendererParams: {
                routeType: routeType,
                context: context
            },
            filter: false,
            sortable: false,
            maxWidth: 90,
            minWidth: 90
        });
    }

    return columns;

}

function facilityColDefs(routeType: string, context: any) {
    const columns: (ColDef | ColGroupDef)[] = [
        {
            field: 'properties.name',
            headerName: 'Name'
        },
        // {
        //     field: 'properties.description',
        //     headerName: 'Description'
        // },
        {
            field: 'properties.facility_type.name',
            headerName: 'Facility Type'
        },
        {
            field: 'properties.street_address',
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
            ...buttonProps
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
            ...buttonProps
        });
    }

    return columns;

}

// Function to extract and concatenate project leader names
function getProjectLeaderNames(params: any) {
    if (params.data.project_leader && Array.isArray(params.data.project_leader)) {
        // const leaderNames = params.data.project_leader.map((leader: any) => leader.full_name);
        // return leaderNames.join('; ');
        const leaderNames = params.data.project_leader.map((leader: any) => leader.first_name + ' ' + leader.last_name);
        return leaderNames.join(', ');
    }
    return '';
}

// .. or staff names
function getStaffNames(params: any) {
    if (params.data.staff && Array.isArray(params.data.staff)) {
        // const staffNames = params.data.staff.map((staff: any) => staff.full_name);
        // return staffNames.join('; ');
        const staffNames = params.data.staff.map((staff: any) => staff.first_name + ' ' + staff.last_name);
        return staffNames.join(', ');
    }
    return '';
}

// ..  or authors
function getAuthorNames(params: any) {
    if (params.data.employee_authors && Array.isArray(params.data.employee_authors)) {
        const authorNames = params.data.employee_authors.map((staff: any) => staff.full_name);
        return authorNames.join('; ');
    }
    return '';
}