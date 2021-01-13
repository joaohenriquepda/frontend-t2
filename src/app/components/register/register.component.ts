import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { concat } from 'rxjs';
import { ApiService } from '../../services/api.service'
import { NgxSpinnerService } from "ngx-spinner";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @ViewChild('alert', { static: false }) modalAlert: ElementRef;
  passwordDataForm; userDataForm: any;
  registerEnabled: boolean = true;
  closeResult: string;
  message: string;

  user: any;

  constructor(
    private api: ApiService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private router: Router,
  ) { }

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

      this.spinner.show()
      setTimeout(() => {
        this.spinner.hide()
        this.openAlert("Registro concluído com sucesso")
        setTimeout(() => {
          this.modalService.dismissAll()
          this.router.navigate(['/profile']);
        }, 1000);
      }, 2000);
    },
      error => {
        console.log(error);
      })

  }

  openAlert(message: any) {
    this.message = message
    const part = this.modalService.open(this.modalAlert, {
      size: 'small',
      scrollable: true,
    }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;

    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

}
