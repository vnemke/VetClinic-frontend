import { Component, Inject, OnInit, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA,  } from "@angular/material/dialog";
import { User } from '../../User';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements OnInit {
  @Input() editUser: User;
  
  constructor(private _mdr: MatDialogRef<DeleteUserComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.editUser = data.editUser
  }

  ngOnInit(): void {}

  onDeleteUser(): void {
   this._mdr.close(true);
  }

  CloseDialog() {   
		this._mdr.close(false);
  }
}
