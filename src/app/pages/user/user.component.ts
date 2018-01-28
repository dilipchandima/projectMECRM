import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { JobService } from '../../services/job.service';

@Component({
    selector: 'user',
    templateUrl: 'user.component.html',
    styleUrls: ['user.component.css']
})

export class UserComponent {

    _isAdmin = false;
    private user: any;
    private jobs: Array<any>;

    public _form: FormGroup;
    public _dataObj: {
        address: string,
        description: string,
        userId: number,
        phone: string
    } = { address: '', description: '', userId: 0, phone: '' };

    constructor(private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
        private jobService: JobService) {
        this.createForm();
    }

    ngOnInit() {
        this.route
            .queryParams
            .subscribe(params => {
                let userId = params.userId;
                if (params.userId == "undefined" || params.userId == null) {
                    userId = localStorage.getItem("user_id");
                }

                this._dataObj.userId = userId;

                this.authService.getUser(userId)
                    .subscribe((res) => {
                        this.user = JSON.parse(res._body).data[0];
                        console.log(JSON.parse(res._body));
                        this._isAdmin = (this.user.user_role == "ADMIN") ? true : false;
                    },
                    (err) => { console.log(err); });

                this.jobService.getByUserID(userId)
                    .subscribe((res) => {
                        if (res.status != 204) {
                            this.jobs = JSON.parse(res._body).data;
                            console.log(JSON.parse(res._body));
                        }
                    },
                    (err) => { console.log(err); });

            });
    }

    private createForm(): void {
        this._form = new FormGroup({
            address: new FormControl(this._dataObj.address, Validators.required),
            description: new FormControl(this._dataObj.description, Validators.required),
            userId: new FormControl(this._dataObj.userId, Validators.required),
            phone: new FormControl(this._dataObj.phone, Validators.required)
        });
    }

    goToNotes(jobID: number) {
        this.router.navigate(['/jobs'], { queryParams: { jobId: jobID } });
    }

    onSubmit() {
        this._form.value.userId = this.user.user_id;
        // console.log(this._form.value);
        this.jobService.createJob(this._form.value)
            .subscribe((res) => {
                // console.log(res);
                this._form.reset();
                this.jobService.getByUserID(this.user.user_id)
                    .subscribe((res) => {
                        this.jobs = JSON.parse(res._body).data;
                        console.log(this.jobs);
                    },
                    (err) => { console.log(err); });
            },
            (err) => {
                console.log(err);
            });
    }

}
