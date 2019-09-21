import { Injectable } from '@angular/core';
import {FormGroup} from '@angular/forms';
import * as _ from 'lodash'
import Swal, {SweetAlertType} from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public show_password: boolean = false;

  constructor() {
  }

  getSwalMessage(message:string, type:SweetAlertType) {
    return Swal.fire({
      title: message,
      type: type,
      showCancelButton: true
    })
  }



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
