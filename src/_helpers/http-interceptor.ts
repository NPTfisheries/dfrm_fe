import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
} from '@angular/common/http';
import { AuthService } from 'src/_services/auth.service';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        const token = this.authService.getToken();

        // Check if the request is a file upload
        if (request.body instanceof FormData) {
            // Clone the request and add the Authorization header only
            const modifiedRequest = request.clone({
                setHeaders: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            return next.handle(modifiedRequest);
        } else {
            // For other requests, add both Content-Type and Authorization headers
            const modifiedRequest = request.clone({
                setHeaders: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            return next.handle(modifiedRequest);
        }
    }
}