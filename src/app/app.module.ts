import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {LoginFormComponent} from './components/login-form/login-form.component';
import {MaterialModuleModule} from "../modules/material-module/material-module.module";
import {ErrorMessageComponent} from './components/error-message/error-message.component';
import {GlobalService} from "./services/global.service";
import {environment} from "../environments/environment";
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AuthService} from "./services/auth.service";
import {RouterModule, Routes} from "@angular/router";
import {ChatComponent} from './components/chat/chat.component';
import {ChatGuard} from "./guards/chat.guard";
import { NotfoundComponent } from './components/notfound/notfound.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { UsermanagmentComponent } from './components/usermanagment/usermanagment.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import {StorageService} from "./services/storage.service";
import {ChatService} from "./services/chat.service";
import { AngularFireDatabase } from '@angular/fire/database';
import { FeedComponent } from './components/feed/feed.component';
import { MessageComponent } from './components/message/message.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserItemComponent } from './components/user-item/user-item.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { DialogdataComponent } from './components/dialogdata/dialogdata.component';
import { SelectedRoomComponent } from './components/selected-room/selected-room.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { ChatInputComponent } from './components/chat-input/chat-input.component';
import { DropzoneDirective } from './directives/dropzone.directive';
import { UploadTaskComponent } from './components/upload-task/upload-task.component';
import { AngularFireStorageModule, StorageBucket } from '@angular/fire/storage';
import {UploadService} from "./services/upload.service";
import { FileUploadProgressComponent } from './components/file-upload-progress/file-upload-progress.component';
import { FileuploadComponent } from './components/fileupload/fileupload.component';

const appRoutes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: 'login',
        component: LoginFormComponent
      },
      {
        path: 'sign-up',
        component: SignUpComponent
      },
      {
        path: 'userMgmt',
        component: UsermanagmentComponent
      },
      {
        path: 'chat-place',
        component: ChatComponent,
        canActivate: [ChatGuard]
      },
      {
        path: 'user-profile',
        component: UserProfileComponent,
        canActivate: [ChatGuard]
      },
      {
        path: 'current_room/:title',
        component: SelectedRoomComponent
      },
    ]
  },

  {path: '404', component: NotfoundComponent},
  {path: '**', redirectTo: '/404'}
];



@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    ErrorMessageComponent,
    ChatComponent,
    NotfoundComponent,
    SignUpComponent,
    UsermanagmentComponent,
    FeedComponent,
    MessageComponent,
    UserListComponent,
    UserItemComponent,
    NavbarComponent,
    UserProfileComponent,
    DialogdataComponent,
    SelectedRoomComponent,
    MainNavComponent,
    ChatInputComponent,
    DropzoneDirective,
    UploadTaskComponent,
    FileUploadProgressComponent,
    FileuploadComponent
  ],
  imports: [
    BrowserModule,
    MaterialModuleModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase, 'angular-auth-firebase'),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    LayoutModule
  ],
  entryComponents: [
    DialogdataComponent
  ],
  providers: [GlobalService, AuthService, ChatGuard, StorageService, ChatService, AngularFireDatabase,
    UploadService,
    DropzoneDirective, {provide: StorageBucket, useValue: 'chatapp-project-f5ada.appspot.com'}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
