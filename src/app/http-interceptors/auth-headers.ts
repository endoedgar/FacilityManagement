import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthHeadersInterceptor implements HttpInterceptor {
    constructor(private authService : AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = this.authService.getToken();
        const authReq = req.clone(
            (authToken) ? ({ setHeaders: { Authorization: `Bearer ${authToken}` } }) : ({}) 
        );
        return next.handle(authReq);
    }

}