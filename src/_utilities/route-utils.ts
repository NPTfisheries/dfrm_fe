import { ActivatedRoute } from '@angular/router';

export function getRouteType(route:ActivatedRoute) {
        return route.snapshot.url[0].path;
    }

export function getRouteSlug(route:ActivatedRoute) {
        return route.snapshot.url[1].path.slice(0,-1);
    }
