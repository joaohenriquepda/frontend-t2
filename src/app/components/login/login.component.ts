import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private api: ApiService,
    private router: Router
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
        console.log(data);
        await this.setInLocalStorage(data)
        this.router.navigate(['/profile']);
      },
      error => {
        console.log(error);

      })

    console.log(this.loginForm.value);


  }

}
