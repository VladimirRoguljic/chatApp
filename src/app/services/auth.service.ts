import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from "@angular/router";
import * as firebase from 'firebase/app';
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: Observable<firebase.User>;
  public userDetails: firebase.User = null;

  constructor(private _firebaseAuth: AngularFireAuth,
              private router: Router) {
    this.user = _firebaseAuth.authState;


    this.user.subscribe((user) => {
      if (user) {
        this.userDetails = user;
      }
      else {
        this.userDetails = null;
      }
    });
  }

  signup(email:string, password: string) {
   return  this._firebaseAuth.auth.createUserWithEmailAndPassword(email,password).then(value=> {
        console.log('Success!', value)
    }).catch(err => {
        console.log('Something went wrong:', err.message)
    })
  }

  isLoggedIn() {
    if (this.userDetails == null ) {
      return false;
    } else {
      return true;
    }
  }


  signInRegular(email, password) {
    return this._firebaseAuth.auth.signInWithEmailAndPassword(email, password)
  }


  signInWithGoogle() {
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
  }

  logout() {
    this._firebaseAuth.auth.signOut()
      .then(() => this.router.navigate(['/']));
  }
}
