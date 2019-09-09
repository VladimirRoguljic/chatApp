import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GlobalService} from "../../services/global.service";
import {AuthService} from "../../services/auth.service";
import { AngularFireAuth } from 'angularfire2/auth';
import {Router} from "@angular/router";

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
              private authService: AuthService,
              private router: Router) {
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

  submit(form) {
    if (this.form.invalid) return this._global.checkFormErrors(this.form);
      this.authService.signInRegular(form.email, form.password)
        .then((res) => {})
  }


  signInWithGoogle() {
       this.authService.signInWithGoogle().then((res) =>
         this.router.navigate(['chat-place'])
    ).catch((err) => console.log(err))
  }


}
