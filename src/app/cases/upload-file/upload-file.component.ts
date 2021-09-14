import {  HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UploaderService } from '../uploader/uploader.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  @Input() droppedFile: any;
  @Output() deleteFile = new EventEmitter<any>();
  value: number = 0;

  constructor(private uploader: UploaderService) { }

  ngOnInit(): void {

    this.uploader.upload("/api/xrays/upload", this.droppedFile)
    .subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        const total: any = event.total
        this.value =  Math.round(event.loaded / total * 100)
        
      } else if(event.type === HttpEventType.Response) {
        console.log(event);
      }
      // console.log('upFile',event);
      console.log('drop',this.droppedFile);
            
    })
  }

  extensionClass(droppedFile: any) {
    return droppedFile.name.split('.').pop().toLowerCase();
    
  }
  
  onDeleteFile() {
    this.deleteFile.emit(this.droppedFile);    
  }

}
