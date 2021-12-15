import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Teacher {
  _id: string;
  firstname: string;
  lastname: string;
}

interface Program {
  code: string;
  name: string;
}

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.sass']
})
export class SubjectComponent implements OnInit {

  teachers: Teacher[] = []
  programs: Program[] = []

  subject = {
    teacher: "",
    name: "",
    code: "",
    intensity: "",
    program: ""
  };

  constructor(
    private apiService: ApiService,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.http.get<Teacher[]>(`${this.apiService.API}/api/teachers`)
    .subscribe(res => {
      this.teachers = res
      console.log(this.teachers)
    })
    this.http.get<Program[]>(`${this.apiService.API}/api/program/all`)
    .subscribe(res => {
      this.programs = res;
      console.log(this.programs)
    })
  }

  createSubjectRequest() {
    const {teacher, name, code, intensity, program} = this.subject;
    console.log(this.subject)
    this.apiService.createSubjectRequest(teacher, name, code, intensity, program)
    .subscribe(res => {
      console.log(res)
      this.router.navigate(['/profile']);
    })
  }
}
