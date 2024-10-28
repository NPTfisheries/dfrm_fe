import { ActivatedRoute } from '@angular/router';

export function getRouteType(route: ActivatedRoute) {
    const routeType = route.snapshot.url[0].path;

    switch (routeType) {
        case 'division':
        case 'divisions':
        case 'division-list':
            return 'divisions';
        case 'department':
        case 'departments':
        case 'department-list':
            return 'departments';
        case 'instrument':
        case 'instruments':
        case 'instrument-list':
            return 'instruments';
        case 'image':
        case 'images':
        case 'image-list':
            return 'images';
        case 'profile':
            return 'profile';
        case 'project':
        case 'projects':
        case 'project-list':
            return 'projects';
        case 'facility':
        case 'facilities':
        case 'facility-list':
            return 'facilities';
        case 'user':
        case 'users':
        case 'user-list':
            return 'users';
        case 'document':
        case 'documents':
        case 'document-list':
            return 'documents';
        case 'location':
        case 'locations':
        case 'location-list':
            return 'locations';
        case 'task':
        case 'tasks':
        case 'task-list':
            return 'tasks';
        default:
            return 'woops';

    }
    // console.log('getRouteType', routeType);
    // return route.snapshot.url[0].path;
}

export function getRouteSlug(route: ActivatedRoute) {
    return route.snapshot.url[1].path;
}
