import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {StorageService} from "../../services/storage.service";
import {MatDialog} from "@angular/material";
import {DialogdataComponent} from "../dialogdata/dialogdata.component";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  authUser: any;
  data: Array<object>;
  constructor(public authService: AuthService,
              public dialog: MatDialog) {
    this.authService.authUser().subscribe(user => {
      this.authUser = user;
      this.data = this.authService.data
    });
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
    StorageService.removeFromLocalStorage();
  }

  openDialog(): void {
    this.dialog.open(DialogdataComponent, {
      width: '400px',
      height: 'auto',
      data: this.data
    });
  }

}
