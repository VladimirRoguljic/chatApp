import {Component, Input, OnInit} from '@angular/core';


@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css']
})
export class ErrorMessageComponent implements OnInit {

  @Input() object: any;
  public messages: object = {};

  constructor() {
  }

  ngOnInit() {
    this.messages = {
      required: () => {
        return 'This field is required';
      },
      minlength: (value) => {
        return `This field must be at least ${value.requiredLength} characters`
      },

      maxlength: (value) => {
        return `This field must be maximum ${value.requiredLength} characters`
      }
    };

  }

  returnErrors() {
    return this.object.errors ? Object.keys(this.object.errors) : [];
  }

  returnErrorMessage(key) {
    return this.messages[key](this.object.errors[key])
  }

}
