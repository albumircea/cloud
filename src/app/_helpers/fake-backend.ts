import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import {User} from '../model/user.model';

let users = JSON.parse(localStorage.getItem('users') as string) || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    // wrap in delayed observable to simulate server api call
    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleRoute(): Observable<HttpEvent<any>>{
      switch (true) {
        case url.endsWith('/users/authenticate') && method === 'POST':
          return authenticate();
        case url.endsWith('/users/register') && method === 'POST':
          return register();
        case url.endsWith('/users') && method === 'GET':
          return getUsers();
        case url.match(/\/users\/\d+$/) && method === 'DELETE':
          return deleteUser();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    // route functions

    function authenticate(): Observable<HttpResponse<any>> {
      const { email, password } = body;
      const user = users.find((x: { email: any; password: any; }) => x.email === email && x.password === password);
      if (!user) { return error('email or password is incorrect'); }
      return ok({
        id: user.id,
        email: user.email,
        token: 'fake-jwt-token'
      });
    }

    function register(): Observable<HttpResponse<any>>{
      const user: User = body;

      if (users.find((x: User) => x.email === user.email)) {
        return error('email "' + user.email + '" is already taken');
      }

      user.id = users.length ? Math.max(...users.map((x: User) => x.id)) + 1 : 1;
      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));

      return ok();
    }

    function getUsers(): Observable<HttpResponse<any>> {
      if (!isLoggedIn()) { return unauthorized(); }
      return ok(users);
    }

    function deleteUser(): Observable<HttpResponse<any>> {
      if (!isLoggedIn()) { return unauthorized(); }

      users = users.filter((x: User) => x.id !== idFromUrl());
      localStorage.setItem('users', JSON.stringify(users));
      return ok();
    }

    // helper functions

    // tslint:disable-next-line:no-shadowed-variable max-line-length
    function ok(body?: User): Observable<HttpResponse<any>> {
      return of(new HttpResponse({ status: 200, body }));
    }

    function error(message: string): Observable<HttpResponse<any>> {
      return throwError({ error: { message } });
    }

    function unauthorized(): Observable<never> {
      return throwError({ status: 401, error: { message: 'Unauthorised' } });
    }

    function isLoggedIn(): boolean {
      return headers.get('Authorization') === 'Bearer fake-jwt-token';
    }

    function idFromUrl(): number {
      const urlParts = url.split('/');
      // tslint:disable-next-line:radix
      return parseInt(urlParts[urlParts.length - 1]);
    }
  }
}

export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
