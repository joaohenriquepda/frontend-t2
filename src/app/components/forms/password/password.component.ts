import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {

  @Output() passwordDataForm = new EventEmitter<any>();

  passwordForm: FormGroup;

  constructor() {
    this.createForm();
  }

  ngOnInit(): void {

    this.sendPasswordForm();

    this.passwordForm.valueChanges.subscribe(val => {
      this.sendPasswordForm();
    });

  }

  createForm() {
    this.passwordForm = new FormGroup({
      password: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(20)])),
      passwordConfirmation: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(20)])),
      validPassword: new FormControl('INVALID', Validators.compose([]))
    });
  }

  sendPasswordForm() {
    if (this.passwordForm.value.password != this.passwordForm.value.passwordConfirmation) {
      this.passwordForm.value.validPassword = "INVALID"
      this.passwordDataForm.emit(this.passwordForm)
    } else {
      this.passwordForm.value.validPassword = "VALID"
      this.passwordDataForm.emit(this.passwordForm)
    }
  }

}
