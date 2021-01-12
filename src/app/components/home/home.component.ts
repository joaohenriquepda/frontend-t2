import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  get getAuth() {
    return JSON.parse(localStorage.getItem('t2Token'));
  }
  users: any;

  constructor(
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.api.getUsers(this.getAuth.token).subscribe(
      data => {
        console.log(data);

        this.users = data
      },
      error => {
        console.log(error);

      })
  }

  deleteUser(id: any) {
    this.api.deleteProfile(this.getAuth.token, id).subscribe(
      data => {
        console.log(data);
        this.getUsers();
      }, error => {
        console.log(error);

      })
  }

}
