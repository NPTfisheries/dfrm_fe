import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, map } from 'rxjs';

import { AuthService } from 'src/_services/auth.service';
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {
        return this.authService.isLoggedIn$.pipe(
            map(isLoggedIn => {
                if (isLoggedIn) {
                    console.log('AuthService: Access Granted!');
                    return true; // User is authenticated, allow access
                } else {
                    // User is not authenticated, redirect to the home page
                    console.log('AuthService: Access DENIED!');
                    this.router.navigate(['home']);
                    return false;
                }
            })
        );
    }
}