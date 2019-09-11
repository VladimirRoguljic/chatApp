import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Observable} from "rxjs";

interface Post {
  title: string;
  content: string
}


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  postCol: AngularFirestoreCollection<Post>;
  posts: Observable<Post[]>;
  title: string;
  content: string;

  constructor(public authService: AuthService,
              private asf: AngularFirestore) {
  }

  ngOnInit() {
    this.postCol = this.asf.collection('posts');
    this.posts = this.postCol.valueChanges();


  }

  logout() {
    this.authService.logout();
  }

  addPost() {
    this.asf.collection('posts').add({'title': '', 'content': this.content});
  }

}
