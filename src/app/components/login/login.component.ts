import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { NgbModal, NgbModalOptions, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('alert', { static: false }) modalAlert: ElementRef;
  loginForm: FormGroup;
  closeResult: string;

  constructor(
    private api: ApiService,
    private router: Router,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.loginForm = new FormGroup({
      cpf: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(11)])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(20)])),
    });
  }

  async setInLocalStorage(data) {
    localStorage.setItem('t2Token', JSON.stringify(data));
  }

  login() {
    this.api.login(this.loginForm.value).subscribe(
      async data => {
        this.spinner.show();

        setTimeout(async () => {
          await this.setInLocalStorage(data)
          this.router.navigate(['/profile']);
        }, 3000);

      },
      error => {
        console.log(error);
        this.openAlert();
        setTimeout(() => {
          this.modalService.dismissAll();
        }, 3000);

      })
  }

  openAlert() {
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
