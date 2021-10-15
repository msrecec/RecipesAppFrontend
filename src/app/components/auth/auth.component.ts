import { Component, Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
@Injectable()
export class AuthComponent implements OnInit {
  username: string = '';
  password: string = '';
  error: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onLogin() {
    let authObs: Observable<{ token: string }>;

    authObs = this.authService.login(this.username, this.password);

    authObs.subscribe(
      (resData) => {
        console.log(resData);
        this.error = '';
      },
      (errorMessage) => {
        this.error = errorMessage;
      }
    );
  }
}
