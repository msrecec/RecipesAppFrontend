import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { exhaustMap, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authService.jwt.pipe(
      take(1),
      exhaustMap((jwt) => {
        if (!jwt || jwt.jwt == '') {
          return next.handle(req);
        }

        const modifiedReq = req.clone({
          headers: new HttpHeaders().set('Authorization', 'Bearer ' + jwt.jwt),
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
