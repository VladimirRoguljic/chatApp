import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  form: FormGroup;
  @Input() error: string | null;
  @Output() submitForm = new EventEmitter();

  constructor(private _fb: FormBuilder) {
    this.form = this._fb.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    });
  }

  ngOnInit() {
  }

  submit() {
    if (this.form.valid) {
      this.submitForm.emit(this.form.value);
  }
}

  get usernameError() {
     console.log(this.form.get('username').errors);
    return this.form.get('username').errors
  }

}
