import { Component, Injectable, OnInit } from '@angular/core';
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

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onLogin() {
    this.authService
      .login(this.username, this.password)
      .subscribe((resData) => {
        console.log(resData);
      });
  }
}
