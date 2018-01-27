import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
    constructor(private http: Http) { }

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private loginUrl = '/api/user/login';
    private getUserUrl = '/api/user/';
    redirectUrl: string;

    login(user: any): Observable<any> {
        return this.http.post(this.loginUrl, user, { headers: this.headers });
    }

    getUser(userId: number): Observable<any> {
        return this.http.get(this.getUserUrl + userId, { headers: this.headers });
    }
}
