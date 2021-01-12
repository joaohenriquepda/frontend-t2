import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.scss']
})
export class UserInformationComponent implements OnInit {

  @Output() userDataForm = new EventEmitter<any>();
  @Input() user: any;

  userForm: FormGroup;
  isValidForm: boolean;
  passwordStatus: any;

  constructor() {
    this.createForm();
  }

  ngOnInit(): void {
    this.sendMessage();

    this.userForm.valueChanges.subscribe(val => {
      this.sendMessage();
    });
  }

  createForm() {
    this.userForm = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(40)])),
      cpf: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(11)])),
      email: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
    });
  }

  sendMessage() {
    this.userDataForm.emit(this.userForm)
  }


}
