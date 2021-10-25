import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AddHeaderInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (request.url.indexOf('/upload') >= 0) { return next.handle(request); }

    if (request.url.indexOf('/archive/') >= 0) {
      const cRequest: HttpRequest<any> = request.clone({
        setHeaders: {
          'Authorization': `Bearer ${this.authService.getStorageToken()}`
        }
      });
      return next.handle(cRequest);
    }

    const clonedRequest: HttpRequest<any> = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.getStorageToken()}`
      }
    });
    return next.handle(clonedRequest);

  }
}
