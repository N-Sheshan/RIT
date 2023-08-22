import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  repass : string = 'none';
 ngOnInit():void{}
registerfromdata = new FormGroup({
  name : new FormControl("",[Validators.required,Validators.minLength(2),Validators.pattern("['a-zA-Z'].*")]),
  email : new FormControl("",[Validators.required,Validators.email]),
  password : new FormControl("",[Validators.required,Validators.minLength(8),Validators.maxLength(15),Validators.pattern("['a-zA-Z0-9'].*")]),
  re_password : new FormControl("",[Validators.required]),
  FacultyID: new FormControl("", [Validators.required]),
  Role: new FormControl("", [Validators.required])
});

  submitdata(){
    if (this.Password.value == this.Re_password.value){
      console.log(this.registerfromdata.valid)
      this.repass = 'none';
    }else{
      this.repass = 'inline';
    }
  }
  
  get Name():FormControl{
    return this.registerfromdata.get("name") as FormControl
  };
  get Email():FormControl{
    return this.registerfromdata.get("email") as FormControl
  }; get Password():FormControl{
    return this.registerfromdata.get("password") as FormControl
  }; get Re_password():FormControl{
    return this.registerfromdata.get("re_password") as FormControl
  };
  get FacultyID():FormControl{
    return this.registerfromdata.get("FacultyID") as FormControl
  }; 
  get Role():FormControl{
    return this.registerfromdata.get("Role") as FormControl
  }

}
