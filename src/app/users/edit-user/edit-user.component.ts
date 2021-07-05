import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Role } from '../Role';
import { User } from '../User';
import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ModalComponent } from '../../modal/modal.component';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  users: User[] = [];
  @Input() user: User;
  @Output() editedUser: EventEmitter<User> = new EventEmitter();
  @Output() deletedUser: EventEmitter<User> = new EventEmitter();
  roles: Role[] = [];
  myForm: FormGroup;
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private fb: FormBuilder, private api: ApiService, public route: ActivatedRoute,
    private matDialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.roles = this.route.snapshot.data.roles;
    this.users = this.route.snapshot.data.users;       
    
    this.myForm = this.fb.group({
      username: {value: this.user.username, disabled: true},
      email: {value: this.user.email, disabled: true },
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      roleId: this.user.roleId
    });
  }

  onEditUser() {
    var roleVelue = this.myForm.value.roleId;
    var index = this.roles.findIndex(r => r.id == roleVelue);
    var role = this.roles[index];
    // declaring user role
    this.user.role = role;
   
    var formValue = {...this.myForm.value, id: this.user.id, username: this.user.username, email: this.user.email}
    var editUser = {...this.user,...formValue}
    console.log('form', formValue);
    // user values from form

    this.api.update("/api/users/" + this.user.id, formValue)
    .subscribe(
      () => {
        this.editedUser.emit(editUser); 
        console.log(editUser);
        this._snackBar.open(this.user.username + ' is edited', 'End now', {
					duration: 5000,
					verticalPosition: this.verticalPosition
				});
      }   
    )
  }

  deleteUserModal(modalData: User) {
    const dailogDeleteUser = this.matDialog.open(ModalComponent, {
      data: { user: modalData, message: 'Do you want to delete ' + this.user.username }  
    });
    dailogDeleteUser.afterClosed().subscribe(res => {
      console.log(res);
      if(res) {
        this.api.delete("/api/users/" + this.user.id)
        .subscribe(()=> {
          this.deletedUser.emit(this.user);
          this._snackBar.open(this.user.username + ' is deleted', 'End now', {
            duration: 5000,
            verticalPosition: this.verticalPosition
          });
        })
      }
    });
  }
}
