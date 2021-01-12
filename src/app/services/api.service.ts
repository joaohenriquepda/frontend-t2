import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  registerUser(user: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(environment.url + '/users', user, httpOptions);
  }


  login(info: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(environment.url + '/sessions', info, httpOptions);
  }

  getProfile(token, id) {
    const httpHeaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'bearer ' + token
      })
    };
    return this.http.get(environment.url + '/users/' + id, httpHeaders);
  }

  updateProfile(token, id, data) {
    const httpHeaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'bearer ' + token
      })
    };
    return this.http.put(environment.url + '/users/' + id, data, httpHeaders);
  }

  getUsers(token) {
    const httpHeaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'bearer ' + token
      })
    };
    return this.http.get(environment.url + '/users', httpHeaders);
  }


  deleteProfile(token, id) {
    const httpHeaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'bearer ' + token
      })
    };
    return this.http.delete(environment.url + '/users/' + id, httpHeaders);
  }

}
