import { Component, OnInit } from '@angular/core';
import { concat } from 'rxjs';
import { ApiService } from '../../services/api.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  passwordDataForm; userDataForm: any;
  registerEnabled: boolean = true;

  user: any;

  constructor(private api: ApiService) { }

  ngOnInit(): void { }

  receiveUserPayload($event) {
    this.userDataForm = $event
    this.checkStatus();
  }

  receivePasswordPayload($event) {
    this.passwordDataForm = $event
    this.checkStatus();
  }

  checkStatus() {
    if (this.passwordDataForm === undefined) {
      console.log("dfghjkl");

    } else {
      if ((this.passwordDataForm.value.validPassword != "INVALID")
        && this.passwordDataForm.status != "INVALID"
        && this.userDataForm.status != "INVALID") {
        this.registerEnabled = false;
      } else {
        this.registerEnabled = true;
      }
    }

  }

  register() {
    this.user = Object.assign(this.userDataForm.value, this.passwordDataForm.value)

    this.api.registerUser(this.user).subscribe(async data => {
      console.log(data);
    },
      error => {
        console.log(error);
      })

  }

}
