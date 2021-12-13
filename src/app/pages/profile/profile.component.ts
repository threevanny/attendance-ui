import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface User {
  _id: string
  email: string
  firstname: string
  lastname: string
  password: string
  password2: string
  role: string
  token: string
}

interface Attendance {
  _id: string
  author: string
  date: string
  difficulties: string
  idAuthor: string
  students: string
  subject: string
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  users: User[] = []
  attendances: Attendance[] = []

  constructor(
    public apiService: ApiService,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    if(!this.apiService.isAuth()){
     this.router.navigate(['/login']);
    }

    // Getting data

    if(this.apiService.getRole() == 'admin') {
      this.http.get<User[]>(`${this.apiService.API}/api/users`)
      .subscribe(data => {
        this.users = data
      })
    }
  // 
    if (this.apiService.getRole() == 'teacher') {
      this.http.get<Attendance[]>(`${this.apiService.API}/api/attendance/all`)
      .subscribe(data => {
        this.attendances = data
      })
    }
  // 
    if (this.apiService.getRole() == 'coordinator') {
      
    }
      
  }
}
