import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";

import { User } from "../authentication/models/user.model";

const users: User[] = [{ id: "1", username: "admin", password: "admin" }, { id: "2", username: "user", password: "user" }];

@Injectable()
export class MokBackendInterceptor implements HttpInterceptor {
  
  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, body } = request;
    if (url.endsWith('/users/authenticate') && method === 'POST') return this.authenticate(body);
    return next.handle(request);
  }

  private authenticate = (body: User) => {
    const { username, password } = body;
    const user = users.find(x => x.username === username && x.password === password );
    if (!user) return this.error('Username or password is incorrect');
    return this.ok({
      id: user.id,
      username: user.username,
      token: user.username
    });
  }

  private ok = (body: any) => of(new HttpResponse({ status: 200, body }));
  private error = (message: string) => throwError({ error: { message } });

}