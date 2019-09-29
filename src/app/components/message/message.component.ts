import {Component, Input, OnInit} from '@angular/core';
import {ChatMessage} from "../../models/chat-message";
import {AuthService} from "../../services/auth.service";
import {Subscription} from "rxjs";
import {UploadService} from "../../services/upload.service";


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input() chatMessage: ChatMessage;
  userEmail: string;
  userName: string;
  messageContent: string;
  timeStamp: Date = new Date();
  isOwnMessage: boolean;
  ownEmail: string;
  subscription: Subscription;
  profileUrl: string;
  defaultUrl: string;

  constructor(private authService: AuthService,
              public uploadService: UploadService) {


    this.subscription = this.authService.authUser().subscribe(user => {
      if (user !== null) {
        this.ownEmail = user.email ? user.email : '';
        this.isOwnMessage = this.ownEmail === this.userEmail;
      }
    });

    this.defaultUrl = '../../../assets/avatar/img_avatar.png';

  }

  ngOnInit(chatMessage = this.chatMessage) {
    this.messageContent = chatMessage.message;
    this.timeStamp = chatMessage.timeSent;
    this.userEmail = chatMessage.email;
    this.userName = chatMessage.userName;
    this.profileUrl = chatMessage.photoUrl;
  }


}
