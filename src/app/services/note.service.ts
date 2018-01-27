import { Injectable } from "@angular/core";
import { Headers, Http } from '@angular/http';
import { Observable } from "rxjs/Observable";

@Injectable()
export class NoteService {
    constructor(private http: Http) { }

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private getByJobIDUrl = '/api/note/'
    private createNoteUrl = '/api/note/create'

    getByJobID(jobId: number): Observable<any> {
        return this.http.get(this.getByJobIDUrl + jobId, { headers: this.headers })
    }

    createNote(data: {
        date: string,
        time: string,
        jobId: number,
        description: string
    }) {
        return this.http.post(this.createNoteUrl, data, { headers: this.headers })
    }
}