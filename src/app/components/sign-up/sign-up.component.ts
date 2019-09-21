import {Component, OnInit} from '@angular/core';
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
              public _global: GlobalService,
              private _firebaseAuth: AngularFireAuth,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this._fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],

      password: ['',
        Validators.compose([Validators.required,
          Validators.minLength(7), Validators.maxLength(24)])],

      displayName: ['', Validators.compose([Validators.required,
        Validators.minLength(2), Validators.maxLength(15),
        Validators.pattern('^[a-zA-Z]+$')])]
    });
  }

  submit(form) {
    if (this.form.invalid) return this._global.checkFormErrors(this.form);
    this.authService.signUp(form.email, form.password, form.displayName).then((res) => {
    });
    form.email = form.password = '';
  }

  showPassword() {
    this._global.showPassword()
  }


}
