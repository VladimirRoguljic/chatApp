import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GlobalService} from "../../services/global.service";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  form: FormGroup;
  @Output() submitForm = new EventEmitter();

  constructor(private _fb: FormBuilder,
              private _global: GlobalService,) {
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this._fb.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(12)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(12)])]
    });
  }

  submit() {
    if (this.form.invalid) return this._global.checkFormErrors(this.form);
    if (this.form.valid) this.submitForm.emit(this.form.value);

  }


}
