import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import {ChatMessage} from "../models/chat-message";
import * as moment from 'moment/moment';
import * as firebase from 'firebase/app';
import {NewRoom} from "../models/new-room";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})

export class ChatService {
  public user: firebase.User;
  chatMessages: AngularFireList<any>;
  rooms$: AngularFireList<any>;
  userName: Observable<string>;
  moment;

  constructor(private db: AngularFireDatabase,
              private authService: AuthService,
              private  afAuth: AngularFireAuth) {
    this.rooms$ = this.db.list('/rooms');
    this.moment = moment();
    this.afAuth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null) {
        this.user = auth;
      }
      this.getUser().subscribe(a =>  {
        this.userName = a['displayName'];
      })
    });

  }


  getUser() {
    const userId = this.user.uid;
    const path = `/users/${userId}`;
    return this.db.object(path).valueChanges();
  }


  getUsers(): Observable<any> {
    const path = '/users';
    return this.db.list(path).valueChanges();
  }

  sendMessage(msg: string) {
    const timestamp = this.getTimeStamp();
    const email = this.user.email;
    this.chatMessages = this.getMessages();
    this.chatMessages.push({
      message: msg,
      timeSent: timestamp,
      userName: this.userName,
      email: email,
      photoUrl: this.user.photoURL
    });
  }

  getMessages(): AngularFireList<ChatMessage[]> {
    return this.db.list('messages', ref =>
      ref.limitToLast(15).orderByKey()
    );
  }

  getTimeStamp() {
    const now = new Date();
    const timesent = moment(now).format('DD/MM/YYYY, h:mm:ss a');
    return timesent;
  }

  getChatRooms(): any {
    return this.db.list('/rooms');
  }

  deleteChatRoom(key: string): void {
    this.rooms$.remove(key)
  }

  createNewChatRoom(data: NewRoom): void {
    this.authService.getAuth();
    this.rooms$.push(data)
  }

  updateChatRoom(key: string, update_object: object): void {
    this.rooms$.update(key, update_object)
  }
}
