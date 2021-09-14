import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent implements OnInit {
  

  files: any[] = [];

  constructor() { }

  ngOnInit(): void {}

  onFileSelected(event: any) {
    var selectedFiles = event.target.files;
    for (let file of selectedFiles ) {
      this.files.push(file);      
    }
  }

  onFileDropped(event: any) {
    for (let item of event) {
      this.files.push(item)
    }
  }

  onDeletedFile(file: any) {
    var res = this.files.findIndex(i => i == file)
    this.files.splice(res, 1);    
  }

}
