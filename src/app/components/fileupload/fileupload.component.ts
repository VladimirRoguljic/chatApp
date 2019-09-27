import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {UploadService} from "../../services/upload.service";

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FileuploadComponent,
      multi: true
    }
  ]
})
export class FileuploadComponent implements OnInit, ControlValueAccessor  {
  onChange: Function;
  public file: File | null = null;
  @HostListener('change', ['$event.target.files']) emitFiles( event: FileList ) {
        let reader = new FileReader();
        reader.onload = () => {
          const img: any = document.getElementById('imageContainer');
          img.src = reader.result;

        };
        reader.readAsDataURL(event.item(0));
    const file = event && event.item(0);
    this.onChange(file);
    this.file = file;
  }
  constructor(private host: ElementRef<HTMLInputElement>,
              public uploadService: UploadService) {

  }

  ngOnInit() {
  }

  writeValue( value: null ) {
    // clear file input
    this.host.nativeElement.value = '';
    this.file = null;
  }

  registerOnChange( fn: Function ) {
    this.onChange = fn;
  }

  registerOnTouched( fn: Function ) {
  }


}
