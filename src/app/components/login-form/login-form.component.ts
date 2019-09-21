import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GlobalService} from "../../services/global.service";
import {AuthService} from "../../services/auth.service";
import { AngularFireAuth } from 'angularfire2/auth';
import {SwalMessages} from "../../models/swal-messages";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  form: FormGroup;

  constructor(private _fb: FormBuilder,
              private _global: GlobalService,
              private _firebaseAuth: AngularFireAuth,
              public globalService: GlobalService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this._fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],

      password: ['', Validators.compose([Validators.required,
        Validators.minLength(6), Validators.maxLength(24)])]
    });
  }

  showPassword() {
    this.globalService.showPassword();
  }

  submit(form) {
    if (this.form.invalid) return this._global.checkFormErrors(this.form);
      this.authService.login(form.email, form.password)
  }

  resetPassword() {
    let email = this.form.get('email').value;
    if(!email) {
      this.globalService.getSwalMessage(SwalMessages.email_check, 'warning');
    }
    this.authService.resetPasswordInit(email).then( () => {
       this.globalService.getSwalMessage(SwalMessages.password_reset, 'success')
    })
  }

}
