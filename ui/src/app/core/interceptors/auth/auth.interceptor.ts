import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');
    const cloneRequest = token
      ? AuthInterceptor.addTokenHeader(request, token)
      : request;

    return next.handle(cloneRequest).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === HttpStatusCode.Unauthorized) {
          alert('Токен истек!');
          // this.user.logout().subscribe(() => {
          //   this.router.navigate([Routers.login])
          //     .then((success) => success && location.reload());
          // });
        }

        return throwError(err);
      }),
    );
  }


  private static addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({headers: request.headers.set('Authorization', 'Bearer ' + token)});
  }
}
