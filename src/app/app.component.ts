import {Component, OnInit} from '@angular/core';
import {ChatService} from "./chat.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ChatApp';
  message:string;
  messages: string[] = [];
  constructor(private chat: ChatService) {}

  sendMessage() {
    this.chat.sendMessage(this.message);
    this.message = '';
  }


  ngOnInit() {
    this.chat.getMessages()
      .subscribe((message: string) => {
        this.messages.push(message);
      });

  }
}
