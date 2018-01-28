import { JobService } from './../../services/job.service';
import { Component } from "@angular/core";
import { Router } from '@angular/router';

@Component({
  selector: 'admin-dashboard',
  templateUrl: 'admin-dashboard.component.html',
  styleUrls: ['admin-dashboard.component.css']
})

export class AdminDashboardComponent {

  private allJobs: Array<any>;
  private jobs: Array<any>;
  _ststusKeys = ["ALL", "ENQUIRY", "COMPLETE", "ISSUED", "ACCEPTED", "COMMENCED", "SCHEDULED", "CANCELLED"]
  filteringStatus = "ALL";

  constructor(
    private router: Router,
    private jobService: JobService) { }

  ngOnInit() {

    this.jobService.getAll()
      .subscribe((res) => {
        this.allJobs = JSON.parse(res._body).data;
        this.filterJobs(this.filteringStatus);
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
}


