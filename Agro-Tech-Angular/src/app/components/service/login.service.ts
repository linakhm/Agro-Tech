import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseURL = environment.auth;

  constructor(private http: HttpClient) { }

  signIn(username , password){
    return this.http.post(this.baseURL + "/signin" , {username , password} )
  }
}
