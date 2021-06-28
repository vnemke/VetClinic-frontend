import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Role } from '../Role';
import { User } from '../User';
import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DeleteUserComponent } from './delete-user/delete-user.component';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  users: User[] = [];
  @Input() editUser: User;
  @Output() editedUser: EventEmitter<User> = new EventEmitter();
  @Output() deletedUser: EventEmitter<User> = new EventEmitter();
  roles: Role[] = [];
  myForm: FormGroup;

  constructor(private fb: FormBuilder, private api: ApiService, public route: ActivatedRoute,
    private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.roles = this.route.snapshot.data.roles
    this.users = this.route.snapshot.data.users    
    
    this.myForm = this.fb.group({
      username: [this.editUser.username, [Validators.required, Validators.minLength(3)]],
      email: [this.editUser.email],
      firstName: [this.editUser.firstName],
      lastName: [this.editUser.lastName],
      roleId: [this.editUser.roleId]
    })
  }

  onEditUser(): void {
    var formValue = {...this.myForm.value, id: this.editUser.id}
    
    this.api.update("/api/users/" + this.editUser.id, formValue)
    .subscribe(
      res => {
        this.editedUser.emit(res); 
        console.log(res);
      }   
    )
  }

  deleteUserModal(user: User) {
    const dailogDeleteUser = this.matDialog.open(DeleteUserComponent, {
      data: { editUser: user }  
    });
    dailogDeleteUser.afterClosed().subscribe(res => {
      console.log(res);
      if(res) {
        this.api.delete("/api/users/" + this.editUser.id)
        .subscribe(()=> {
          this.deletedUser.emit(this.editUser);
        })
      }
    });
  }
 
}
