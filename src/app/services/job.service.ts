import { Injectable } from "@angular/core";
import { Headers, Http } from '@angular/http';
import { Observable } from "rxjs/Observable";

@Injectable()
export class JobService {
    constructor(private http: Http) { }

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private getByUserIDUrl = '/api/job/byUserId/';
    private getByIDUrl = '/api/job/';
    private getAllUrl = '/api/job/getAll';

    getByUserID(userId: number): Observable<any> {
        return this.http.get(this.getByUserIDUrl + userId, { headers: this.headers })
    }

    getById(jobId: number): Observable<any> {
        return this.http.get(this.getByIDUrl + jobId, { headers: this.headers })
    }

    getAll(): Observable<any> {
        return this.http.get(this.getAllUrl, { headers: this.headers })
    }
}
