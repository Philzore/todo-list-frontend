import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    ) { }

  loginWithUsernameAndPassword(username:string, password:string) {
    const url = environment.baseUrl + "/login/" ;
    const body = {
      "username": username,
      "password": password
    } ;
    return lastValueFrom(this.http.post(url, body)) ;
  }
}
