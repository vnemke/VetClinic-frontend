import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Role } from '../Role';
import { User } from '../User';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  @Input() editUser: User;
  @Output() editedUser: EventEmitter<User> = new EventEmitter();
  roles: Role[] = [];
  myForm: FormGroup;

  constructor(private fb: FormBuilder, private api: ApiService, public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.roles = this.route.snapshot.data.roles    
    // console.log(this.roles);
    
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
      }   
    )
    
  }
}
