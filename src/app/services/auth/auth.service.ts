import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, first, tap } from 'rxjs/operators';
import { UserLoginCommand } from 'src/app/command/user/user-login-command';
import { JWT } from 'src/app/model/auth/jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authURL: string = 'http://localhost:8080/api/authenticate';
  registerURL: string = 'http://localhost:8080/api/user/register';

  jwt: BehaviorSubject<JWT> = new BehaviorSubject<JWT>(new JWT(''));
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  register(
    username: string,
    password: string,
    firstName: string,
    lastName: string
  ) {
    return this.http
      .post<any>(this.registerURL, {
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName,
      })
      .pipe(catchError(this.handleError));
  }

  login(username: string, password: string) {
    return this.http
      .post<{ token: string }>(
        this.authURL,
        new UserLoginCommand(username, password)
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(resData.token);
          this.router.navigate(['/']);
        })
      );
  }

  private handleAuthentication(token: string) {
    const jwt = new JWT(token);
    this.jwt.next(jwt);
    localStorage.setItem('jwt', JSON.stringify(jwt));
    this.autoLogout(+jwt.payload.exp);
  }

  logout() {
    this.jwt.next(new JWT(''));
    localStorage.removeItem('jwt');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    this.router.navigate(['/login']);
  }

  autoLogin() {
    const item = localStorage.getItem('jwt');

    const jwt: JWT = JSON.parse(
      item !== null ? item : JSON.stringify(new JWT(''))
    );

    if (jwt.jwt == '') {
      return;
    }

    this.jwt.next(jwt);

    const expirationDuration =
      new Date(jwt.expirationDate).getTime() - new Date().getTime();

    console.log(expirationDuration);

    this.autoLogout(expirationDuration);
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';

    if (
      !errorRes.error ||
      !errorRes.error.apierror ||
      !errorRes.error.apierror.message
    ) {
      return throwError(errorMessage);
    }

    switch (errorRes.error.apierror.message) {
      case 'Bad credentials':
        errorMessage = 'Invalid username or password';
        break;
    }

    return throwError(errorMessage);
  }
}
