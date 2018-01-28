import {ChangeDetectorRef, Component} from '@angular/core';
import {Router} from '@angular/router';
import {RegistrationService} from '../../services/registration.service';

@Component({
  selector: 'register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css']
})
export class RegisterComponent {
  path = '';
  public form: {
    name: string,
    email: string,
    phone: string,
    password: string,
    passwordre: string,
    picture: string,
    address1: string,
    address2: string,
    address3: string
  } =
    {
      name: '',
      email: '',
      phone: '',
      password: '',
      passwordre: '',
      picture: '',
      address1: '',
      address2: '',
      address3: ''
    };

  public file_srcs: string[] = [];

  public debug_size_before: string[] = [];

  public debug_size_after: string[] = [];

  constructor(private router: Router, private changeDetectorRef: ChangeDetectorRef, private  registrationService: RegistrationService) {
  }

  onSubmit(data) {
    console.log(data);
    this.form.name = data.name;
    this.form.email = data.email;
    this.form.phone = data.phone;
    this.form.password = data.password;
    this.form.passwordre = data.passwordre;
    this.form.address1 = data.address1;
    this.form.address2 = data.address2;
    this.form.address3 = data.address3;
    console.log(this.form);
    // this.router.navigate(['../login']);
    this.registrationService.signup(this.form)
      .subscribe((res) => {
          console.log(res, res._body.userRole);
          if (res.status === 201) {
            this.router.navigate(['../login']);
          }
        },
        (err) => {
          console.log(err);
        });
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
      this.form.picture = reader.result;
    };
    reader.readAsDataURL(file);
  }
}
