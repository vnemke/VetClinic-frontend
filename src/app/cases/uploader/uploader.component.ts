import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { uploadingFile } from '../uploadingFile';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent implements OnInit {

  files: any[] = [];
  @Input() xrays: any = [];

  constructor() {}

  ngOnInit(): void {
    if (this.xrays.length) {
      this.xrays.forEach((xray: any) => {
        var uplFile = new uploadingFile(xray.url, xray.fileName);
        this.files.push(uplFile)
      });
    }
  }

  onFileSelected(event: any) {
    var selectedFiles = event.target.files;
    for (let file of selectedFiles ) {
      var uplFile = new uploadingFile(file);
      this.files.push(uplFile);
    }
  }

  onFileDropped(event: any) {
    for (let item of event) {
      var uplFile = new uploadingFile(item);
      this.files.push(uplFile);
    }
  }

  onDeletedFile(file: any) {
    var res = this.files.findIndex(i => i == file)
    this.files.splice(res, 1);    
  }

  getUploaded() {
    return this.files.map((u: any) => { 
      return  {url: u.url, fileName: u.fileName};
    }) 
  }

}
