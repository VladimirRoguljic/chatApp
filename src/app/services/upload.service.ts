import {Injectable} from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {Observable} from "rxjs";
import * as firebase from "firebase";
import {StorageService} from "./storage.service";
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireAuth} from "angularfire2/auth";

@Injectable({
  providedIn: 'root'
})

export class UploadService {
  currentuserUId: any;
  avatarUrl: any;
  profileUrl: Observable<any>;
  public user: Observable<firebase.User>;
  public uploadPercent: number;

  constructor(private storage: AngularFireStorage,
              private  afAuth: AngularFireAuth,
              public db: AngularFireDatabase) {

  }


  uploadAvatar(event, displayName): void{
    let file = event;
    this.currentuserUId = JSON.parse(StorageService.getDataFromLocalStorage('userDetails')).user.uid;
    const filePath = `/users/${this.currentuserUId}/avatar`;
    const fileNamePath = `/users/${this.currentuserUId}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    // observe percentage changes
     task.percentageChanges().subscribe(uploadPercent => {
       this.uploadPercent = uploadPercent
    });
    this.storage.upload(filePath, file).then(res => {
      ref.getDownloadURL().toPromise().then(downloadUrl => {
        this.avatarUrl = downloadUrl;
        const data = {
          file: file,
          name: file.name,
          type: file.type,
          size: file.size,
          avatarUrl: this.avatarUrl
        };
        this.afAuth.auth.currentUser.updateProfile({photoURL: this.avatarUrl, displayName: displayName.displayName});
        this.db.object(filePath).update(data).catch(error => console.log(error));
      });
    });
    this.db.object(fileNamePath).update(displayName).catch(error=>console.log(error))

  }


  getUploadedAvatar(): Observable<any> {
    this.currentuserUId = JSON.parse(StorageService.getDataFromLocalStorage('userDetails')).user.uid;
    return this.db.object(`/users/${this.currentuserUId}/avatar`).valueChanges();
  }


  downloadAvatar(): Observable<any> {
    this.currentuserUId = JSON.parse(StorageService.getDataFromLocalStorage('userDetails')).user.uid;
    const ref = this.storage.ref(`/users/${this.currentuserUId}/avatar`);
    this.profileUrl = ref.getDownloadURL();
    return this.profileUrl;
  }

}

