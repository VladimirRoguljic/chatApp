import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AngularFireAuth} from "angularfire2/auth";
import {GlobalService} from "../../services/global.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
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

      password: ['',
        Validators.compose([Validators.required,
          Validators.minLength(7), Validators.maxLength(24)])]
    });
  }

  submit(form) {
    if (this.form.invalid) return this._global.checkFormErrors(this.form);
    this.authService.signup(form.email, form.password).then((res) => {
    });
    form.email = form.password = '';
  }


}
