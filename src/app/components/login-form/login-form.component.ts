import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

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
      username: '',
      password: ''
    });
  }

  ngOnInit() {
  }

  submit() {
    if (this.form.valid) {
      this.submitForm.emit(this.form.value)
    }
  }

}
