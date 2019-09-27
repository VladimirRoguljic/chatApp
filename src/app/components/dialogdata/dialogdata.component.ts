import {Component, OnInit} from '@angular/core';
import { AngularFireList } from '@angular/fire/database';
import {NewRoom} from "../../models/new-room";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {GlobalService} from "../../services/global.service";
import {Observable} from "rxjs";
import {map} from "rxjs/internal/operators";
import {SwalMessages} from "../../models/swal-messages";
import {ChatService} from "../../services/chat.service";



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
  index: number;
  roomUpdate: boolean = false;
  updateName: FormGroup;
  constructor(private chatSerivce: ChatService,
              private _global: GlobalService,
              private fb: FormBuilder) {
    this.rooms$ =  this.chatSerivce.getChatRooms();
    this.rooms = this.rooms$.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
    this.form = this.fb.group({
         name: ['', Validators.compose([Validators.required,
           Validators.maxLength(10), Validators.pattern('^[a-zA-Z]+$')])],
         status: ['', Validators.required]
    });

    this.updateName = new FormGroup({
        name: new FormControl('', Validators.compose([Validators.required,
          Validators.maxLength(10), Validators.pattern('^[a-zA-Z]+$')]))
      }
    )
  }

  get roomStatus() {
    return this.form.get('status').value
  }

  get roomName() {
    return this.form.get('name').value
  }

  get UpdateName() {
    return this.updateName.get('name').value
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
        this.chatSerivce.createNewChatRoom(data);
        this.name = '';
      }
  }

  deleteRoom(key: string) {
    this._global.getSwalMessage(SwalMessages.delete_room, 'warning')
      .then(result => {
          if(result.value) {
            this._global.getSwalMessage(SwalMessages.deleted_room, 'success');
            this.chatSerivce.deleteChatRoom(key)
          } else if(result.dismiss) {
            this._global.getSwalMessage(SwalMessages.cancel, 'error')
          }
      })
  }

  updateChatRoom(key: string, event) {
    if(this.updateName.invalid) {
      return this._global.checkFormErrors(this.updateName)
    } else {
       if(event.keyCode === 13 || event.onclick) {
         this.chatSerivce.updateChatRoom(key, {title: this.UpdateName});
         this._global.getSwalMessage(SwalMessages.update_room, 'success');
         this.roomUpdate = !this.roomUpdate
       }
    }
  }

  returnIndex(index: number): number {
    this.index = index;
    return this.index
  }

  // static generateRoomID(): any {
  //   // Math.random should be unique because of its seeding algorithm.
  //   // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  //   // after the decimal.
  //   return  Math.random().toString(36).substr(2, 9);
  // };


}
