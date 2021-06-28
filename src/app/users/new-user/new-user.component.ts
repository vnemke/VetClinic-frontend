import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../User';
import { Role } from '../Role';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  user: User;
  users: User[] = [];
  roles: Role[] = [];
  myForm: FormGroup;
  
  constructor(private fb: FormBuilder, private api: ApiService, public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.roles = this.route.snapshot.data.roles
    this.users = this.route.snapshot.data.users    
    
    this.myForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: [''],
      firstName: [''],
      lastName: [''],
      roleId: ['']
    })
  }

}
