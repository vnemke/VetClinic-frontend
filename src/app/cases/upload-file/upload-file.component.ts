import {  HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UploaderService } from '../uploader/uploader.service';
import { uploadingFile } from '../uploadingFile';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  @Input() droppedFile: uploadingFile;
  @Output() deleteFile = new EventEmitter<any>();
  complete: boolean = false;
  value: number = 0;

  constructor(private uploader: UploaderService) { }

  ngOnInit(): void {
    if (this.droppedFile.uploadFile) {
      this.uploader.upload("/api/xrays/upload", this.droppedFile.uploadFile)
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          const total: any = event.total
          this.value = Math.round(event.loaded / total * 100)
          
        } else if (event.type === HttpEventType.Response) {
          this.complete = true;
          this.droppedFile.url = event.body;          
        }            
      })
    }
  }

  extensionClass(droppedFile:uploadingFile) {
    const uplFile: any = droppedFile.fileName
    return uplFile?.split('.').pop().toLowerCase();
  }
  
  onDeleteFile() {
    this.deleteFile.emit(this.droppedFile);    
  }
}
