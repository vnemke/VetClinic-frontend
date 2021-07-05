import { Component, Inject, OnInit, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA,  } from "@angular/material/dialog";
import { User } from '../users/User';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  message: string;
  constructor(private _mdr: MatDialogRef<ModalComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.message = data.message;
    console.log(data);
  }

  ngOnInit(): void {}

  onDelete(): void {
   this._mdr.close(true);
  }

  CloseDialog() {   
		this._mdr.close(false);
  }
}

