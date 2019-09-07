import { Injectable } from '@angular/core';
import {FormGroup} from '@angular/forms';
import * as _ from 'lodash'

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

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
}
