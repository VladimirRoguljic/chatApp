export class User {
  uid?: string;
  email?: string;
  username?: string;
  password?: string;
  status: string;
  displayName: string;

  constructor(init: any) {
    this.uid = init.uid;
    this.email = init.email;
    this.username = init.username;
    this.password = init.password;
    this.status = init.status;
    this.displayName = init.displayName
  }
}
