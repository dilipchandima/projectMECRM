import { Component } from "@angular/core";
import { Router } from '@angular/router';

@Component({
    selector: 'register',
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.css']
})
export class RegisterComponent {
    constructor(private router: Router) { }

    onSubmit(){
        console.log("test on submit")
        this.router.navigate(['../login']);
    }
}