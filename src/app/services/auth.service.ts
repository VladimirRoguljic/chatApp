import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from "@angular/router";
import * as firebase from 'firebase/app';
import {Observable} from "rxjs";
import Swal from 'sweetalert2';
import {StorageService} from "./storage.service";


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
        StorageService.setDataInLocalStorage('refreshToken', this.userDetails.refreshToken);
      }

      else {
        this.userDetails = null;
      }
    });
  }

  signup(email: string, password: string) {
    return this._firebaseAuth.auth.createUserWithEmailAndPassword(email, password).then(value => {
      if (value) {
        Swal.fire({
          title: 'You are successfully create new account',
          type: 'success',
        }).then((result) => {
          if (result.value) {
            this.router.navigate(['/login']);
          }
        });
      }
    })
      .catch(err => {
        Swal.fire({
          title: `${err.message}`,
          type: 'warning'
        });
      });
  }

  static isLoggedIn() {
    if ( StorageService.getDataFromLocalStorage('refreshToken') == null ) {
      return false;
    } else {
      return true;
    }
  }


  signInRegular(email, password) {
    return this._firebaseAuth.auth.signInWithEmailAndPassword(email, password).then(value => {
      if(value) this.router.navigate(['chat-place'])
    }).catch(err => {
      Swal.fire({
        title: `${err.message}`,
        type: 'warning'
      });
    });
  }

   getAuth() {
    return this._firebaseAuth.auth;
   }
  // This will be implemented later
  // signInWithGoogle() {
  //   return this._firebaseAuth.auth.signInWithPopup(
  //     new firebase.auth.GoogleAuthProvider()
  //   );
  // }

  resetPasswordInit(email: string) {
    return this._firebaseAuth.auth.sendPasswordResetEmail( email, {url: 'http://localhost:4200/login'})
  }

  logout() {
    this._firebaseAuth.auth.signOut()
      .then(() => this.router.navigate(['/']));
  }
}
