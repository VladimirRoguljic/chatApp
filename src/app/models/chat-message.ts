export class ChatMessage {
  email?: string;
  userName?: string;
  message?: string;
  timeSent?: Date = new Date();

  constructor(init: any) {
    this.email = init.email;
    this.userName = init.userName;
    this.message = init.message;
    this.timeSent = init.timeSent;
  }
}
