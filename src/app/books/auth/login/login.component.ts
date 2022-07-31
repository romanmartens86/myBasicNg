import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';
import Validation from '../../../classes/validation'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Output() successEmitter = new EventEmitter();

  form!: UntypedFormGroup;
  submitted: boolean = false;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private authServ: AuthService,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        email: ['',
          [
            Validators.required,
            Validators.email
          ]
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],
      },
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.authServ.doLogin(this.f.email.value, this.f.password.value)
      .then(res => this.successEmitter.emit(),
        err => { console.log(err) });

  }
}
