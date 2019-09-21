import {Component, OnInit} from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import {ChatService} from "../../services/chat.service";
import {Observable} from "rxjs";
import * as firebase from 'firebase'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  title: string;
  message: string;
  user: Observable<firebase.User>;

  constructor(private db: AngularFireDatabase,
              private chat: ChatService) {
  }

  ngOnInit() {
  }

  send() {
    this.chat.sendMessage(this.message);
    this.message = ''
  }

  handleMessage(event) {
    console.log(event.keyCode);
    if(event.keyCode === 13) {
      this.send()
    } else return
  }


}
