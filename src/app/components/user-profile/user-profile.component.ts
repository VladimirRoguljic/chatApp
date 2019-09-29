import {Component, OnInit} from '@angular/core';
import {UploadService} from "../../services/upload.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";



@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  profileFormGroup: FormGroup;

  constructor(private uploadService: UploadService,
              private _fb: FormBuilder) {

    this.profileFormGroup = this._fb.group({
      displayName: ['', Validators.compose([Validators.required,
        Validators.minLength(2), Validators.maxLength(10)])],
      file: [null]
    });
  }

  ngOnInit() {
  }

  onUploadAvatar(event) {
    const file = event.file;
    const data = {displayName: event.displayName};
    this.uploadService.uploadAvatar(file, data);
    this.profileFormGroup.reset();
  }

}
