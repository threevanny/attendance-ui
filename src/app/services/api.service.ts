import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API = "localhost:3000";

  constructor(
    private http: HttpClient
  ) { }

  loginRequest(email: String, password: String) {
    return this.http.post<any>(`${this.API}/auth/login`,
      { email: email, password: password }
    )
  }

  registerRequest(name: String, email: String, password: String) {
    return this.http.post<any>(`${this.API}/auth/signup`,
      { name: name, email: email, password: password, password2: password }
    )
  }
}