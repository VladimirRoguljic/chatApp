export class ChatMessage {
  email?: string;
  userName?: string;
  message?: string;
  timeSent?: Date = new Date();
  photoUrl: string;

  constructor(init: any) {
    this.email = init.email;
    this.userName = init.userName;
    this.message = init.message;
    this.timeSent = init.timeSent;
    this.photoUrl = init.photoUrl
  }
}
