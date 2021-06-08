import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { LibraryConfig } from './models/config';
import { User } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  constructor(private http: HttpClient, private router: Router, @Inject('config') private config: LibraryConfig) { }
  
  login(user: User): Observable<User> {
    return this.http.post<User>(this.config.authEndpoint, { username: user.username, password: user.password })
      .pipe(
          map(usr => {
            localStorage.setItem('storUser', JSON.stringify(usr));
            return usr;
        })
      );
  }

  logout(): void {
    localStorage.removeItem('storUser');
    this.router.navigate(['/login']);
  }

  getLoggedUser(): User {
    return JSON.parse(localStorage.getItem('storUser') ?? JSON.stringify(null));
  }

  isUserAuthenticated(): boolean {
    return !!localStorage.getItem('storUser');
  }

}
