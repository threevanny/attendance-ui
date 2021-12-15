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

  registerRequest(firstname: String, lastname: String, email: String, password: String, role: String, salary: String) {
    return this.http.post<any>(`${this.API}/api/register`,
      { 
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        password2: password,
        role: role,
        salary: salary
      }
    )
  }

  logoutRequest() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    
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

  getId() {
    return localStorage.getItem('id');
  }

  getProfile(token: any) {
    return this.http.post<any>(`${this.API}/api/profile`, { token: token })
  }

  createAttendanceRequest(author: any, idAuthor: any, subject: String, students: String, difficulties: string) {
    return this.http.post<any>(`${this.API}/api/attendance/create`,
     { author: author, idAuthor: idAuthor, subject: subject, students: students, difficulties: difficulties })
  }

  createProgramRequest(code: String, name: String, coordinator: any, duration: String) {
    return this.http.post<any>(`${this.API}/api/program/create`,
     { code: code, name: name, coordinator: coordinator, duration: duration })
  }

  createSubjectRequest(teacher: String, name: String, code: String, intensity: String, program: String, schedule: String) {
    return this.http.post<any>(`${this.API}/api/subject/create`,
      { teacher: teacher, name: name, code: code, intensity: intensity, program: program, schedule: schedule })
  }

  getTeachers() {
    return this.http.get<any>(`${this.API}/api/teachers`)
  }

  getPrograms() {
    return this.http.get<any>(`${this.API}/api/program/all`)
  }
}