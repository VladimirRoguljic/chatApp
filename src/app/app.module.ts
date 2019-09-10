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
import { HomepageComponent } from './components/homepage/homepage.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { UsermanagmentComponent } from './components/usermanagment/usermanagment.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomepageComponent,
  },

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
  {path: '404', component: NotfoundComponent},
  {path: '**', redirectTo: '/404'}
];


@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    ErrorMessageComponent,
    ChatComponent,
    HomepageComponent,
    NotfoundComponent,
    SignUpComponent,
    UsermanagmentComponent
  ],
  imports: [
    BrowserModule,
    MaterialModuleModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase, 'angular-auth-firebase'),
    AngularFireAuthModule

  ],
  providers: [GlobalService, AuthService, ChatGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
