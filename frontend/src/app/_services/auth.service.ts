import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router,private http:HttpClient) { }

  rootURL = 'http://172.16.71.2:9090/api/v1/JA/login'
   role :any =null;

  isauthenticated() {
    if (sessionStorage.getItem('token') !== null) {
      return true;
    }
    return true;    // this function retrun the true value means we can't access main page directly other wise false means we can access directly
  }

  // this set of code is use to block the direct access of main page
  canAccess() {
    if (this.isauthenticated()) {
      this.router.navigate(["login"])
    }
  }

// ------------------------------------------------------------------------------------
// for login code
login(username:string,password:string): Observable<any>{
  return this.http.post(this.rootURL, { username, password })
}


}
