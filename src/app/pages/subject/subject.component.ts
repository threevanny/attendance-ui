import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.sass']
})
export class SubjectComponent implements OnInit {

  subject = {
    teacher: "",
    name: "",
    code: "",
    intensity: "",
    program: ""
  };

  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  createSubjectRequest() {
    const {teacher, name, code, intensity, program} = this.subject;
    this.apiService.createSubjectRequest(teacher, name, code, intensity, program)
    .subscribe(res => {
      console.log(res)
      this.router.navigate(['/profile']);
    })
  }
}
