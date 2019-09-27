import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-selected-room',
  templateUrl: './selected-room.component.html',
  styleUrls: ['./selected-room.component.css']
})
export class SelectedRoomComponent implements OnInit {
  room_name: string;

  constructor(private snapshot: ActivatedRoute) {
    this.snapshot.params.subscribe(params =>{
         this.room_name = params.title
    })
  }

  ngOnInit() {
  }

}
