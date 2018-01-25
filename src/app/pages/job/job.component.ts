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

    constructor(private route: ActivatedRoute,
        private router: Router,
        private noteService: NoteService,
        private jobService: JobService) { }

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
}