import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UserLoginCommand } from 'src/app/command/user/user-login-command';
import { JWT } from 'src/app/model/auth/jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authURL: string = 'http://localhost:8080/api/authenticate';
  registerURL: string = 'http://localhost:8080/api/user/register';

  jwt: BehaviorSubject<JWT> = new BehaviorSubject<JWT>(new JWT(''));

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string) {
    return this.http
      .post<{ token: string }>(
        this.authURL,
        new UserLoginCommand(username, password)
      )
      .pipe(
        tap((resData) => {
          const jwt = new JWT(resData.token);
          console.log(jwt);
          this.jwt.next(jwt);
        })
      );
  }
}
