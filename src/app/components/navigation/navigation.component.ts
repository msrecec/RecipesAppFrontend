import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  isAuthenticated: boolean = false;
  jwtSub?: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.jwtSub = this.authService.jwt.subscribe((jwt) => {
      console.log('Navigation subscription');
      console.log(jwt);
      if (jwt.jwt == '' || !jwt) {
        this.isAuthenticated = false;
      } else {
        this.isAuthenticated = true;
      }
    });
  }

  onLogout() {
    this.authService.logout();
  }
}
