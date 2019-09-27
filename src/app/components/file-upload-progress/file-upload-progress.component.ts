import {Component, Input, OnInit} from '@angular/core';



@Component({
  selector: 'app-file-upload-progress',
  templateUrl: './file-upload-progress.component.html',
  styleUrls: ['./file-upload-progress.component.css'],
})


export class FileUploadProgressComponent implements OnInit {
  @Input() progress;
  constructor() { }

  ngOnInit() {}

}
