import { Component, OnInit } from '@angular/core';
import {ChatService} from "../../services/chat.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: Observable<any>;
  constructor(private chat: ChatService) {
    this.users = this.chat.getUsers();
  }

  ngOnInit() {
  }

}
