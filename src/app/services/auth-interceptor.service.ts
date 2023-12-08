import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the auth token from the service.
    const authToken = localStorage.getItem('token');
    if (authToken) {
      req = req.clone({
        setHeaders: { Authorization: `Token ${authToken}` }
      });
    }

    return next.handle(req).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            //not authorized
            this.router.navigateByUrl('/login');
          }
        }
        return throwError(() => err);
      })
    );
  }

  // Clone the request and replace the original headers with
  // cloned headers, updated with the authorization.
  // const authReq = req.clone({
  //   headers: req.headers.set('Authorization', authToken)
  // });
}
