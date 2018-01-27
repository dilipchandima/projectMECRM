import { FormGroup, FormControl, Validators } from '@angular/forms';
import { JobService } from './../../services/job.service';
import { Component } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { NoteService } from "../../services/note.service";

@Component({
    selector: 'job',
    templateUrl: 'job.component.html',
    styleUrls: ['job.component.css']
})

export class JobComponent {

    private notes: Array<any>;
    private job: any;

    public _form: FormGroup;
    public _dataObj: {
        date: string,
        time: string,
        jobId: number,
        description: string
    } = { date: "", time: "", jobId: 0, description: "" };


    constructor(private route: ActivatedRoute,
        private router: Router,
        private noteService: NoteService,
        private jobService: JobService) {
        this.createForm();
    }

    ngOnInit() {
        this.route
            .queryParams
            .subscribe(params => {
                console.log(params);

                this.noteService.getByJobID(params.jobId)
                    .subscribe((res) => {
                        this.notes = JSON.parse(res._body).data;
                        console.log(this.notes);
                    },
                    (err) => { console.log(err) });

                this.jobService.getById(params.jobId)
                    .subscribe((res) => {
                        this.job = JSON.parse(res._body).data[0];
                        console.log(this.job);
                    },
                    (err) => { console.log(err) });

            });
    }

    private createForm(): void {
        this._form = new FormGroup({
            date: new FormControl(this._dataObj.date, Validators.required),
            time: new FormControl(this._dataObj.time, Validators.required),
            jobId: new FormControl(this._dataObj.jobId, Validators.required),
            description: new FormControl(this._dataObj.description, Validators.required)
        });
    }

    onSubmit() {
        this._form.value.jobId = this.job.job_id;
        this._form.value.date = this.getFormatedDate();
        this._form.value.time = this.getFormatedTime();
        // console.log(this._form.value);

        this.noteService.createNote(this._form.value)
            .subscribe((res) => {
                // console.log(res);
                this._form.reset();
                this.noteService.getByJobID(this.job.job_id)
                    .subscribe((res) => {
                        this.notes = JSON.parse(res._body).data;
                        // console.log(this.notes);
                    },
                    (err) => { console.log(err) });
            },
            (err) => {
                console.log(err)
            })
    }

    getFormatedDate() {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1; //January is 0!
        let yyyy = today.getFullYear();
        let min = today.getMinutes();
        let hr = today.getHours();
        let dds = dd.toString();
        let mms = mm.toString();

        if (dd < 10) {
            dds = '0' + dd
        }

        if (mm < 10) {
            mms = '0' + mm
        }

        return yyyy + "-" + mms + "-" + dds;
    }

    getFormatedTime() {
        let today = new Date();
        let min = today.getMinutes();
        let hr = today.getHours();
        let s = today.getSeconds();
        let mins = min.toString();
        let hrs = hr.toString();
        let ss = s.toString();

        if (min < 10) {
            mins = '0' + mins
        }

        if (hr < 10) {
            hrs = '0' + hrs
        }

        if (s < 10) {
            ss = '0' + ss;
        }

        return hrs + ":" + mins + ":" + ss;
    }
}