import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {
  constructor(private http: Http,
              private cookieService: CookieService,
              private router: Router) {
  }

  private headers = new Headers({'Content-Type': 'application/json'});
  private loginUrl = '/api/user/login';
  private getUserUrl = '/api/user/';
  private getAllUsersURL = '/api/user/getAll';
  private deleteUserByIdURL = '/api/user/delete/';
  private updateSuperAdminKeyURL = 'api/user/superAdmin/update';

  redirectUrl: string;
  cookieValue = 'UNKNOWN';

  login(user: any): Observable<any> {
    return this.http.post(this.loginUrl, user, {headers: this.headers});
  }

  getUser(userId: number): Observable<any> {
    return this.http.get(this.getUserUrl + userId, {headers: this.headers});
  }

  checkUserRole() {
    return localStorage.getItem('userRole');
  }

  isAutharized() {
    return (this.cookieService.get('CRM_COOKIE')) ? true : false;
  }

  logout() {
    this.cookieService.deleteAll();
    localStorage.clear();
    this.router.navigate(['/login']);

    return 'logout succesfully';
  }

  getAllUsers(): Observable<any> {
    return this.http.get(this.getAllUsersURL, {headers: this.headers});
  }

  deleteUserById(userId: number): Observable<any> {
    return this.http.delete(this.deleteUserByIdURL + userId, {headers: this.headers});
  }

  updateSuperAdminKey(data: {key: string, newKey: string}){
    return this.http.post(this.updateSuperAdminKeyURL, data, {headers: this.headers})
  }
}
