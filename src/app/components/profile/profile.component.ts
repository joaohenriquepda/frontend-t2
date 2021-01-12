import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user; userData: any;
  updateEnabled: boolean = true;


  get getAuth() {
    return JSON.parse(localStorage.getItem('t2Token'));
  }

  constructor(
    private api: ApiService
  ) {
    this.getUserInformation();
  }

  ngOnInit(): void {
  }

  receiveUserPayload($event) {
    this.user = $event
    this.updateEnabled = false
  }

  getUserInformation() {
    this.api.getProfile(this.getAuth.token, this.getAuth.id).subscribe(
      data => {
        this.userData = data;
        console.log(this.user);
      },
      error => {
        console.log(error);
      }
    )
  }

  updateProfile() {
    this.api.updateProfile(this.getAuth.token, this.getAuth.id, this.user.value).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);

      }
    )
  }


}
