import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { error } from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


constructor(private loginauth:AuthService){}

loginfromdata = new FormGroup({
  username: new FormControl("",[Validators.required,Validators.pattern("[a-zA-Z].*")]),
  password : new FormControl("",[Validators.required,Validators.minLength(8),Validators.maxLength(15)])
});


get Username(){
  return this.loginfromdata.get("username") as FormControl 
}
get Password(){
  return this.loginfromdata.get("password") as FormControl 
}

submitdata() {
  if (this.loginfromdata.valid) {
    const formData = this.loginfromdata.value;
    if (formData.username && formData.password) {
      this.loginauth.login(formData.username, formData.password).subscribe(
        (response: any) => {
          this.loginauth.role=response[0].role
        },
        (error: any) => {
        }
      );
    } else {
      console.error('Username or password is not defined.');
    }
  }
}

}
