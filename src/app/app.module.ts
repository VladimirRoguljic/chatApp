import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {ChatService} from "./chat.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { LoginFormComponent } from './components/login-form/login-form.component';
import {MaterialModuleModule} from "../modules/material-module/material-module.module";
import {CommonModule} from "@angular/common";
import { ErrorMessageComponent } from './components/error-message/error-message.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    ErrorMessageComponent
  ],
  imports: [
    BrowserModule,
    MaterialModuleModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
