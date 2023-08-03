// https://jasonwatmore.com/post/2022/11/29/angular-14-user-registration-and-login-example-tutorial#alert-service-ts

import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from 'src/_services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.authService.user$.getValue();
        if (user) {
            // authorised so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['home'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}


// NOT IMPLEMENTED 8/3/23