import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
} from '@angular/common/http';
import { AuthService } from 'src/_services/auth.service';


// This class intercepts outgoing HTTP requests and inserts header information

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler) {

        const token = this.authService.getToken();

        // Clone the request and add custom headers
        const modifiedRequest = request.clone({
            setHeaders: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        // Pass the modified request to the next interceptor or HttpClient
        return next.handle(modifiedRequest);
    }
}
