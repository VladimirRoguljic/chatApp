import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import { AngularFireList } from '@angular/fire/database';
import {NewRoom} from "../../models/new-room";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GlobalService} from "../../services/global.service";
import {Observable} from "rxjs";
import {map} from "rxjs/internal/operators";
import {SwalMessages} from "../../models/swal-messages";



@Component({
  selector: 'app-dialogdata',
  templateUrl: './dialogdata.component.html',
  styleUrls: ['./dialogdata.component.css']
})
export class DialogdataComponent implements OnInit {
  name: string;
  showRoomForm: boolean = false;
  rooms$: AngularFireList<NewRoom[]>;
  rooms: Observable<any[]>;
  form: FormGroup;
  constructor(private authService: AuthService,
              private _global: GlobalService,
              private fb: FormBuilder) {
    this.rooms$ =  this.authService.getChatRooms();
    this.rooms = this.rooms$.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
    this.form = this.fb.group({
         name: ['', Validators.compose([Validators.required,
           Validators.maxLength(10), Validators.pattern('^[a-zA-Z]+$')])],
         status: ['', Validators.required]
    })
  }

  get roomStatus() {
    return this.form.get('status').value
  }

  get roomName() {
    return this.form.get('name').value
  }

  ngOnInit() {
  }

  onCreateNewRoom() {
    if (this.form.invalid) return this._global.checkFormErrors(this.form);
    else  {
        const data: NewRoom = {
          title: this.roomName,
          status: this.roomStatus
        };
        this.authService.createNewChatRoom(data);
        this.name = '';
      }
  }

  deleteRoom(key: string) {
    this._global.getSwalMessage(SwalMessages.delete_room, 'warning')
      .then(result => {
          if(result.value) {
            this._global.getSwalMessage(SwalMessages.deleted_room, 'success');
            this.rooms$.remove(key)
          } else if(result.dismiss) {
            this._global.getSwalMessage(SwalMessages.cancel, 'error')
          }
      })
  }

  // static generateRoomID(): any {
  //   // Math.random should be unique because of its seeding algorithm.
  //   // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  //   // after the decimal.
  //   return  Math.random().toString(36).substr(2, 9);
  // };


}
