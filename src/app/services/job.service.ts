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
    private createUrl = '/api/job/create';
    private updateUrl = '/api/job/update'
    private acceptedUrl = '/api/job/accepted'

    getByUserID(userId: number): Observable<any> {
        return this.http.get(this.getByUserIDUrl + userId, { headers: this.headers })
    }

    getById(jobId: number): Observable<any> {
        return this.http.get(this.getByIDUrl + jobId, { headers: this.headers })
    }

    getAll(): Observable<any> {
        return this.http.get(this.getAllUrl, { headers: this.headers });
    }

    createJob(data: {
        address: string,
        description: string,
        userId: number,
        phone: string
    }) {
        return this.http.post(this.createUrl, data, { headers: this.headers });
    }

    updateStatus(data: {
        status: string
        jobId: number
    }) {
        return this.http.post(this.updateUrl, data, { headers: this.headers });
    }

    accepted(data: { jobId: number }) {
        return this.http.post(this.acceptedUrl, data, { headers: this.headers })
    }
}
