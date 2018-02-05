import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from '../../services/registration.service';

@Component({
  selector: 'register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css']
})
export class RegisterComponent {
  path = '';
  register_as_admin = false;

  passwordError = false;
  nameError = false;
  emailError = false;
  phoneError = false;
  addressError = false;
  registrationFail = false;

  public form: {
    name: string,
    email: string,
    phone: string,
    password: string,
    passwordre: string,
    SuPw: string,
    picture: string,
    address1: string,
    address2: string,
    address3: string,
    role: string
  } =
    {
      name: '',
      email: '',
      phone: '',
      password: '',
      passwordre: '',
      SuPw: '',
      picture: '',
      address1: '',
      address2: '',
      address3: '',
      role: 'USER'
    };

  public file_srcs: string[] = [];

  public debug_size_before: string[] = [];

  public debug_size_after: string[] = [];

  constructor(private router: Router, private changeDetectorRef: ChangeDetectorRef, private registrationService: RegistrationService) {
  }

  onSubmit(data) {


    if (data.passwordre != undefined
      && data.password != undefined
      && data.password === data.passwordre
      && data.passwordre.length >= 8
      && data.name != undefined
      && data.email != undefined
      && data.phone != undefined
      && data.address1 != undefined) {

      this.passwordError = false;
      this.nameError = false;
      this.emailError = false;
      this.phoneError = false;
      this.addressError = false;

      // console.log(data);
      this.form.name = data.name;
      this.form.email = data.email;
      this.form.phone = data.phone;
      this.form.password = data.password;
      this.form.passwordre = data.passwordre;
      this.form.address1 = data.address1;
      this.form.address2 = data.address2;
      this.form.address3 = data.address3;
      this.form.SuPw = data.SuPw;
      if (this.register_as_admin) {
        this.form.role = "ADMIN";
      } else {
        this.form.role = "USER";
      }
      // console.log(this.form);
      // this.router.navigate(['../login']);
      this.registrationService.signup(this.form)
        .subscribe((res) => {
          // console.log(res, res._body.userRole);
          if (res.status === 201) {
            this.registrationFail = false;
            this.router.navigate(['../login']);
          } else {
            this.registrationFail = true;
          }
        },
        (err) => {
          console.log(err);
          this.registrationFail = true;
        });
    }
    else {
      if (!(data.passwordre != undefined
        && data.password != undefined && data.password === data.passwordre && data.passwordre.length >= 8)) {
        this.passwordError = true;
      }
      if (data.name == undefined || data.name == "") {
        this.nameError = true;
      }
      if (data.email == undefined || data.email == "") {
        this.emailError = true;
      }
      if (data.phone == undefined || data.phone == "") {
        this.phoneError = true;
      }
      if (data.address1 == undefined || data.address1 == "") {
        this.addressError = true;
      }
    }
    if ((data.passwordre != undefined
      && data.password != undefined && data.password === data.passwordre && data.passwordre.length >= 8)) {
      this.passwordError = false;
    }
    if (!(data.name == undefined || data.name == "")) {
      this.nameError = false;
    }
    if (!(data.email == undefined || data.email == "")) {
      this.emailError = false;
    }
    if (!(data.phone == undefined || data.phone == "")) {
      this.phoneError = false;
    }
    if (!(data.address1 == undefined || data.address1 == "")) {
      this.addressError = false;
    }
  }

  fileChange(input) {
    this.readFiles(input.files);
  }

  fileRemove() {
    this.form.picture = '';
  }

  readFiles(files, index = 0) {
    const reader = new FileReader();
    if (index in files) {
      this.readFile(files[index], reader, (result) => {
        const img = document.createElement('img');
        img.src = result;
        this.resize(img, 250, 250, (resized_jpeg, before, after) => {
          this.debug_size_before.push(before);
          this.debug_size_after.push(after);
          this.file_srcs.push(resized_jpeg);
          this.readFiles(files, index + 1);
          this.form.picture = resized_jpeg;
        });
      });
    } else {
      this.changeDetectorRef.detectChanges();
    }
  }

  resize(img, MAX_WIDTH: number, MAX_HEIGHT: number, callback) {
    return img.onload = () => {
      let width = img.width;
      let height = img.height;
      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      const dataUrl = canvas.toDataURL('image/jpeg');
      callback(dataUrl, img.src.length, dataUrl.length);
    };
  }

  readFile(file, reader, callback) {
    reader.onload = () => {
      callback(reader.result);
      // this.form.picture = reader.result;
    };
    reader.readAsDataURL(file);
  }

  asAdmin() {
    this.register_as_admin = !this.register_as_admin;
  }
}
