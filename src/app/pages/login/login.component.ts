import { Component } from "@angular/core";
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from "../../services/auth.service";

@Component({
    selector: 'user-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})

export class LoginComponent {


    public _loginForm: FormGroup;
    public _loginObj: {
        email: string,
        password: string
    } = { email: "", password: "" };

    constructor(private authServise: AuthService, private router: Router) {
        this.createForm();
    }

    private createForm(): void {
        this._loginForm = new FormGroup({
            email: new FormControl(this._loginObj.email, Validators.required),
            password: new FormControl(this._loginObj.password, Validators.required)
        });
    }

    loginUser() {
        console.log(this._loginForm.value);
        this.authServise.login(this._loginForm.value)
            .subscribe((res) => {
                console.log(res, res._body.userRole)
                if (res.status === 200) {
                    let obj = JSON.parse(res._body);
                    localStorage.setItem("userRole", obj.userRole);
                    localStorage.setItem("auth", obj.token);
                    this.router.navigate(['/user']);
                }
            },
            (err) => { console.log(err) });
    }
}