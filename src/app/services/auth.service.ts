import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from "@angular/router";
import * as firebase from 'firebase/app';
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import Swal from 'sweetalert2';
import {StorageService} from "./storage.service";
import {AngularFireDatabase} from '@angular/fire/database';
import {UploadService} from "./upload.service";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: Observable<firebase.User>;
  public userDetails: firebase.User = null;
  public authState: any;
  currentuserUId$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  currentuserUId: string;
  subscription: Subscription;

  constructor(public db: AngularFireDatabase,
              private uploadService: UploadService,
              private  afAuth: AngularFireAuth,
              private router: Router) {
    this.user = afAuth.authState;
  }


  get currentUserID(): string {
    return this.authState !== null ? this.authState.user.uid : '';
  }

  signUp(email: string, password: string, displayName: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(user => {
      this.authState = user;
      this.sendVerificationMail();
      this.setUserData(email, displayName);
      Swal.fire({
        title: 'You are successfully create new account, Verify your email address in your inbox',
        type: 'success',
      }).then((result) => {
        if (result.value) {
          this.router.navigate(['/login']);
        }
      });
    }).catch(err => {
      Swal.fire({
        title: `${err.message}`,
        type: 'warning'
      });
    });
  }

  login(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password).then(user => {
      if (user.user.emailVerified !== true) {
        this.sendVerificationMail();
        Swal.fire({
          title: 'Please validate your email address. Kindly check your inbox',
          type: 'warning'
        });
      }
      if (user.user.emailVerified === true) {
        const status = 'online';
        this.authState = user;
        this.setStatus(status);
        StorageService.setDataInLocalStorage('userDetails', JSON.stringify(user));
        this.router.navigate(['./chat-place']);
      }
    }).catch(err => {
      console.log(err);
      Swal.fire({
        title: `${err.message}`,
        type: 'warning'
      });
    });
  }

  setUserData(email: string, displayName: string) {
    const path = `users/${this.currentUserID}`;
    const status = 'subscribed';
    const data = {
      email: email,
      displayName: displayName,
      status: status
    };
    this.db.object(path).update(data).catch(error => console.log(error));
  }

  setStatus(status: string): void {
    const path = `users/${this.currentUserID}`;
    const data = {
      status: status
    };
    this.db.object(path).update(data).catch(error => console.log(error));
  }

  isLoggedIn() {
    let userDetails = JSON.parse(StorageService.getDataFromLocalStorage('userDetails'));
    if (userDetails !== null || undefined) {
      return true;
    }
  }


  sendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification();

  }


  getAuth() {
    this.currentuserUId = this.afAuth.auth.currentUser.uid;
    return this.afAuth.auth;
  }


  resetPasswordInit(email: string) {
    return this.afAuth.auth.sendPasswordResetEmail(email, {url: 'http://localhost:4200/login'});
  }

  logout() {
    this.user = this.afAuth.authState;
    const status = 'offline';
    this.subscription = this.user.subscribe(user => {
      this.currentuserUId$.next(user.uid);
      this.currentuserUId = this.currentuserUId$.value;
      const path = `users/${this.currentuserUId}`;
      const data = {
        status: status
      };
      this.db.object(path).update(data).catch(error => console.log(error));
    });
    this.afAuth.auth.signOut().then(() => {
      this.subscription.unsubscribe();
      this.authState = null;
      this.router.navigate(['/']);
    });
  }

  authUser() {
    return this.user;
  }

}
