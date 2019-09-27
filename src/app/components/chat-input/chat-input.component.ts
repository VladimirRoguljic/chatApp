import {Component, OnInit} from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import {ChatService} from "../../services/chat.service";
import {Observable} from "rxjs";
import * as firebase from 'firebase'

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.css']
})
export class ChatInputComponent implements OnInit {
  title: string;
  message: string;
  user: Observable<firebase.User>;
  constructor(private db: AngularFireDatabase,
              private chat: ChatService) { }

  ngOnInit() {
  }

  send() {
    this.chat.sendMessage(this.message);
    this.message = ''
  }

  handleMessage(event) {
    if(event.keyCode === 13) {
      this.send()
    } else return
  }

}
