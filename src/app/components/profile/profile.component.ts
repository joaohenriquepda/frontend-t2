import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

  @ViewChild('alert', { static: false }) modalAlert: ElementRef;
  user; userData: any;
  updateEnabled: boolean = true;
  closeResult: string;
  message: string;

  get getAuth() {
    return JSON.parse(localStorage.getItem('t2Token'));
  }

  constructor(
    private api: ApiService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private router: Router
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
        this.userData.token = this.getAuth.token
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
        this.spinner.show()
        setTimeout(() => {
          this.spinner.hide()
          this.openAlert("Registro concluído com sucesso")
          setTimeout(() => {
            this.modalService.dismissAll()
          }, 1000);
        }, 2000);
      },
      error => {
        this.spinner.show()
        setTimeout(() => {
          this.spinner.hide()
          this.openAlert("Houve um problema")
          setTimeout(() => {
            this.modalService.dismissAll()
          }, 1000);
        }, 2000);

      }
    )
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
