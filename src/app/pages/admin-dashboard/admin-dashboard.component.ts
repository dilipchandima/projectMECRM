import { JobService } from './../../services/job.service';
import { Component } from "@angular/core";
import { Router } from '@angular/router';

@Component({
    selector: 'admin-dashboard',
    templateUrl: 'admin-dashboard.component.html',
    styleUrls: ['admin-dashboard.component.css']
})

export class AdminDashboardComponent {

    private jobs: Array<any>;

    constructor(
        private router: Router,
        private jobService: JobService) { }

    ngOnInit() {

        this.jobService.getAll()
            .subscribe((res) => {
                this.jobs = JSON.parse(res._body).data;
                console.log(this.jobs);
            },
            (err) => { console.log(err) });

    }
}