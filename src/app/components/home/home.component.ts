import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { NgbModal, NgbModalOptions, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('user', { static: false }) modalUser: ElementRef;
  @ViewChild('alert', { static: false }) modalAlert: ElementRef;
  users; userUpdate; userUpdateId: any;
  closeResult: string;
  message: string;

  get getAuth() {
    return JSON.parse(localStorage.getItem('t2Token'));
  }

  constructor(
    private api: ApiService,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
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
        this.spinner.show()
        setTimeout(() => {
          this.spinner.hide()
          this.openAlert("Remoção realizada com sucesso")
          setTimeout(() => {
            this.modalService.dismissAll()
            this.getUsers();
          }, 1000);
        }, 2000);
      }, error => {
        this.spinner.show()
        setTimeout(() => {
          this.spinner.hide()
          this.openAlert("Ocorreu um problema")
        }, 2000);

      })
  }

  openUser(user: any, userUpdateId: any) {
    this.userUpdateId = userUpdateId;
    this.userUpdate = user;

    console.log(this.userUpdateId);

    //  this.createUpdateForm()

    const part = this.modalService.open(this.modalUser, {
      size: 'xl',
      scrollable: true,
    }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;

    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  receiveUserUpdatePayload(event) {
    this.userUpdate = event.value

  }

  updateUser() {

    this.api.updateProfile(this.getAuth.token, this.userUpdateId, this.userUpdate).subscribe(
      data => {

        this.spinner.show()
        setTimeout(() => {
          this.spinner.hide()
          this.openAlert("Atualização realizada com sucesso")
          setTimeout(() => {
            this.modalService.dismissAll()
            this.getUsers();
          }, 1000);
        }, 2000);
      },
      error => {
        this.spinner.show()
        setTimeout(() => {
          this.spinner.hide()
          this.openAlert("Ocorreu um problema")
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
