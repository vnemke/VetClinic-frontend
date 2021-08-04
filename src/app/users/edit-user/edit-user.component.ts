import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Role } from '../Role';
import { User } from '../User';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ModalComponent } from '../../modal/modal.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

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
  ref: DynamicDialogRef;
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private fb: FormBuilder, private api: ApiService, public route: ActivatedRoute,
    public dialogService: DialogService, private _snackBar: MatSnackBar) { }

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
    // console.log('form', this.myForm.value);
    // console.log('formint', this.myForm.value.roleId);
    // console.log('roles', this.roles);
  }

  onEditUser() {
    var roleValue = this.myForm.value.roleId;
    console.log('int', roleValue);
    var index = this.roles.findIndex(r => r.id == roleValue);    
    var role = this.roles[index];
    console.log('role?',role);
    
    this.user.roleId = role.id;
    this.user.role = role;

    console.log('assg', this.user);
    
   
    var formValue = {...this.myForm.value, id: this.user.id, username: this.user.username, email: this.user.email, roleId: this.user.roleId}
    var editUser = {...this.user, ...formValue}
    // console.log('euser', editUser);
    
    
    // user values from form
    this.api.update("/api/users/" + this.user.id, formValue)
      .subscribe(
        () => {
          this.editedUser.emit(editUser);
          console.log('edit',editUser);
          this._snackBar.open(this.user.username + ' is edited', 'End now', {
            duration: 5000,
            verticalPosition: this.verticalPosition
          });
        }
      )
      // console.log('req', formValue);
  }

  deleteUserModal(modalUser: User) {
    const dailogDeleteUser = this.dialogService.open(ModalComponent, {
      data: { user: modalUser }, header: 'Do you want to delete ' + modalUser.username, width: '37%'
    });
    dailogDeleteUser.onClose.subscribe(res => {
      console.log(res);
      if (res) {
        this.api.delete("/api/users/" + this.user.id)
        .subscribe(() => {
          this.deletedUser.emit(this.user);
          this._snackBar.open(modalUser.username + ' is deleted', 'End now', {
            duration: 5000,
            verticalPosition: this.verticalPosition
          });
        })
      }
    });
  }
}
