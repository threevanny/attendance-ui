import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API = "http://localhost:3000";

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  loginRequest(email: String, password: String) {
    return this.http.post<any>(`${this.API}/api/login`,
      { email: email, password: password }
    )
  }

  registerRequest(firstname: String, lastname: String, email: String, password: String, role: String) {
    return this.http.post<any>(`${this.API}/api/register`,
      { 
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        password2: password,
        role: role
      }
    )
  }

  logoutRequest() {
    const token = this.getToken();
    return this.http.post<any>(`${this.API}/api/logout`, { token: token })
    .subscribe(res => {
      console.log(res)
      localStorage.removeItem('token');
      localStorage.removeItem('id');
      localStorage.removeItem('role');
      localStorage.removeItem('name');
      this.router.navigate(['/login']);
    })
  }

  isAuth(): boolean {
    if(localStorage.getItem('token')){
      return true;
    } else {
      return false;
    }
  }

  getRole() {
    if(localStorage.getItem('role')){
      return localStorage.getItem('role');
    } else {
      return ''
    }
  }

  getToken(): any {
    return localStorage.getItem('token');
  }

  getName() {
    if(localStorage.getItem('name')){
      return localStorage.getItem('name');
    } else {
      return ''
    }
  }

  getProfile(token: any) {
    return this.http.post<any>(`${this.API}/api/profile`, { token: token })
  }
}