import { AuthService } from './../../services/auth.service';
import { JobService } from './../../services/job.service';
import { Component } from "@angular/core";
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'admin-dashboard',
  templateUrl: 'admin-dashboard.component.html',
  styleUrls: ['admin-dashboard.component.css']
})

export class AdminDashboardComponent {

  allJobs: Array<any>;
  allUsers: Array<any>;
  jobs: Array<any>;
  _ststusKeys = ["ALL", "ENQUIRY", "QUOTATION", "SCHEDULED", "COMMENCED", "COMPLETED", "CANCELLED"];
  filteringStatus = "ALL";
  _isSuperError = false;
  _superAdminChanged = false;
  repeatNewKey = "";
  repeatSAKWrong = false;

  public _form: FormGroup;
  public _dataObj: {
    key: string,
    newKey: string,
    newKey2: string
  } = { key: '', newKey: '', newKey2: '' };

  constructor(
    private router: Router,
    private jobService: JobService,
    private authService: AuthService) {
    this.createForm();
  }

  ngOnInit() {

    this.jobService.getAll()
      .subscribe((res) => {
        if (res.status != 204) {
          this.allJobs = JSON.parse(res._body).data;
          this.filterJobs(this.filteringStatus);
        }
      },
      (err) => { console.log(err) });

    this.authService.getAllUsers()
      .subscribe((res) => {
        console.log(res);
        if (res.status != 204) {
          this.allUsers = JSON.parse(res._body).data;
        }
      },
      (err) => { console.log(err) });
  }

  filterJobs(status: string) {
    if (status == "ALL") {
      this.jobs = this.allJobs;
    }
    else {
      this.jobs = this.allJobs.filter((job) => {
        if (job.job_status == status) {
          return true
        }
        else {
          return false;
        }
      });
    }
  }

  statusChanged(status: string) {
    this.filterJobs(status);
  }

  goToNotes(jobID: number) {
    this.router.navigate(['/jobs'], { queryParams: { jobId: jobID } });
  }

  goToUser(userId: number) {
    this.router.navigate(['/user'], { queryParams: { userId: userId } });
  }

  private createForm(): void {
    this._form = new FormGroup({
      key: new FormControl(this._dataObj.key, Validators.required),
      newKey2: new FormControl(this._dataObj.newKey2, Validators.required),
      newKey: new FormControl(this._dataObj.newKey, Validators.required)
    });
  }

  onSubmit() {
    console.log(this._form.value)
    if (this._form.value.newKey == this._form.value.newKey2 && this._form.value.newKey.length >= 8) {
      this.repeatSAKWrong = false;
      this.authService.updateSuperAdminKey(this._form.value)
        .subscribe((res) => {
          console.log(res)
          this._form.reset();
          if (res.status == 200) {
            this._isSuperError = false;
            this._superAdminChanged = true;
          } else {
            this._isSuperError = true;
            this._superAdminChanged = false;
          }
        },
        (err) => {
          console.log(err)
        })
    } else {
      this.repeatSAKWrong = true;
      this._isSuperError = false;
    }
  }
}


