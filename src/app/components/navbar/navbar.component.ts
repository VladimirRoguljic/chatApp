import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {StorageService} from "../../services/storage.service";
import {MatDialog} from "@angular/material";
import {DialogdataComponent} from "../dialogdata/dialogdata.component";
import {UploadService} from "../../services/upload.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  authUser: any;
  profileUrl: any;
  showMenu: boolean = false;


  constructor(public authService: AuthService,
              private uploadService: UploadService,
              public dialog: MatDialog) {




    this.authService.authUser().subscribe(user => {
      this.authUser = user;
    });

    if(this.authService.isLoggedIn()) {
      this.profileUrl = this.uploadService.getUploadedAvatar() ?
        this.uploadService.getUploadedAvatar() : this.uploadService.downloadAvatar();
    }  else {
       this.profileUrl = null
    }

  }

  ngOnInit() {
  }

  openHamburger() {
    this.showMenu = !this.showMenu;
  }

  logout() {
    this.authService.logout();
    StorageService.removeFromLocalStorage();
  }

  openDialog(): void {
    this.dialog.open(DialogdataComponent, {
      width: '400px',
      height: 'auto',
    });
  }


}
