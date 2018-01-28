import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(
    private authService: AuthService, 
    private router: Router ) {
  }

  logout() {
    this.authService.logout();
  }

  gotoDashboard(){
    if(this.authService.checkUserRole() == "ADMIN"){
      this.router.navigate(['/dashboard'])
    }
  }
}
