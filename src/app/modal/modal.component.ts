import { Component, Inject, OnInit, Input, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA,  } from "@angular/material/dialog";
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  // message: string;
  // constructor(private _mdr: MatDialogRef<ModalComponent>, 
  //   @Inject(MAT_DIALOG_DATA) public data: any,  public dialogService: DialogService) {

    // this.message = data.message;
    // console.log(data);
  // }

  constructor(public dialogService: DialogService, public ref: DynamicDialogRef) {}

  ngOnInit(): void {}

  onDelete(): void {
   this.ref.close(true);
  }

  CloseDialog() {   
		this.ref.close(false);
  }
}

