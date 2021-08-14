import { Component, Inject, OnInit, Input, ViewChild } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  constructor(public dialogService: DialogService, public ref: DynamicDialogRef) {}

  ngOnInit(): void {}

  onDelete(): void {
   this.ref.close(true);
  }

  CloseDialog() {   
		this.ref.close(false);
  }
}

