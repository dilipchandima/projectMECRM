import { Injectable } from "@angular/core";
import { Headers, Http } from '@angular/http';
import { Observable } from "rxjs/Observable";

@Injectable()
export class NoteService {
    constructor(private http: Http) { }

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private getByJobIDUrl = '/api/note/'

    getByJobID(jobId: number): Observable<any> {
        return this.http.get(this.getByJobIDUrl + jobId, { headers: this.headers })
    }
}