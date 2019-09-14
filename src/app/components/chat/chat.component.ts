import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {StorageService} from "../../services/storage.service";
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
  userEmail: string;

  constructor(public authService: AuthService,
              private db: AngularFireDatabase,
              private chat: ChatService) {
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
    StorageService.removeFromLocalStorage()
  }

  send() {
    this.chat.sendMessage(this.message);
    this.message = ''
  }

}
