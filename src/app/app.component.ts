import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Component, transition } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  _isError = false;
  error = "";

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
    else{
      this._isError=true;
      this.error = "You don't have permisions to view dashboard"
      setTimeout(()=> {
        this._isError = false;
      }, 3000)
    }
  }
}
