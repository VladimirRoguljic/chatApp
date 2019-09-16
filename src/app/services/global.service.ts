import { Injectable } from '@angular/core';
import {FormGroup} from '@angular/forms';
import * as _ from 'lodash'

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public show_password: boolean = false;


  constructor() { }

  checkFormErrors(formGroup: FormGroup): void {
    _.each(formGroup.controls, control => {
      control.markAsTouched();

      if (control.controls) _.each(control.controls, c => {
        c.markAsTouched();
        this.checkFormErrors(c);
      });
    });
  }

  showPassword() {
    this.show_password = !this.show_password;
  }
}
