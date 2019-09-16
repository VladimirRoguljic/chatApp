import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ChatMessage} from "../../models/chat-message";
import {AuthService} from "../../services/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit, OnDestroy {
  @Input() chatMessage: ChatMessage;
  userEmail: string;
  userName: string;
  messageContent: string;
  timeStamp: Date = new Date();
  isOwnMessage: boolean;
  ownEmail: string;
  subscription: Subscription;
  constructor(private authService: AuthService) {
   this.subscription = this.authService.authUser().subscribe(user => {
        // this.ownEmail = user.email ? user.email : '';
        this.isOwnMessage = this.ownEmail === this.userEmail
    })
  }

  ngOnInit(chatMessage = this.chatMessage) {
    this.messageContent = chatMessage.message;
    this.timeStamp = chatMessage.timeSent;
    this.userEmail = chatMessage.email;
    this.userName = chatMessage.userName;
  }

  ngOnDestroy() {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
