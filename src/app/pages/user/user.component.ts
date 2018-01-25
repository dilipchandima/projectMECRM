import { Component } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from "../../services/auth.service";
import { JobService } from "../../services/job.service";

@Component({
    selector: 'user',
    templateUrl: 'user.component.html',
    styleUrls: ['user.component.css']
})

export class UserComponent {

    private user: any;
    private jobs: Array<any>;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
        private jobService: JobService) { }

    ngOnInit() {
        this.route
            .queryParams
            .subscribe(params => {
                console.log(params);

                this.authService.getUser(params.userId)
                    .subscribe((res) => {
                        this.user = JSON.parse(res._body).data[0];
                        console.log(this.user);
                    },
                    (err) => { console.log(err) });

                this.jobService.getByUserID(params.userId)
                    .subscribe((res) => {
                        this.jobs = JSON.parse(res._body).data;
                        console.log(this.jobs);
                    },
                    (err) => { console.log(err) });

            });
    }

    goToNotes(jobID: number){
        this.router.navigate(['/jobs'], { queryParams: { jobId: jobID } });
    }
}