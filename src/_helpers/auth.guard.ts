// https://jasonwatmore.com/post/2022/11/29/angular-14-user-registration-and-login-example-tutorial#alert-service-ts

import { Injectable, inject } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from 'src/_services/auth.service';

// https://stackoverflow.com/questions/75564717/angulars-canactivate-interface-is-deprecated-how-to-replace-it
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const user= this.authService.getUser();
        if (user) {
            // authorized so return true
            return true;
        } else {
            // not logged in so redirect to login page with the return url
            this.router.navigate(['home']);
            return false;
        }
    }
}