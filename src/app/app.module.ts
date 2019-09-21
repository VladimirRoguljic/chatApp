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
import {MAT_DIALOG_DEFAULT_OPTIONS} from "@angular/material";
import { DialogdataComponent } from './components/dialogdata/dialogdata.component';
import { SelectedRoomComponent } from './components/selected-room/selected-room.component';


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
      }
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
    SelectedRoomComponent
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
    AngularFirestoreModule
  ],
  entryComponents: [
    DialogdataComponent
  ],
  providers: [GlobalService, AuthService, ChatGuard, StorageService, ChatService, AngularFireDatabase],
  bootstrap: [AppComponent]
})
export class AppModule {
}
