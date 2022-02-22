import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../User';
import { Role } from '../Role';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '@vetclinic-app/core/services/api.service';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  users: User[] = [];
  roles: Role[] = [];
  userForm: FormGroup;
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  
  constructor(private fb: FormBuilder, private api: ApiService, public route: ActivatedRoute,
    public router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.roles = this.route.snapshot.data.roles;
    this.users = this.route.snapshot.data.users;
    console.log(this.users);
        
    
    
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', Validators.required],
      firstName: [''],
      lastName: [''],
      roleId: [null, Validators.required]
    })
  }

  onAddUser() {
    this.api.post("/api/auth/register", this.userForm.value)
    .subscribe(
      (res: any) => {
        console.log('result',res);
        this.router.navigate(['/app/users'])
        this._snackBar.open(res.username + 'user is added', 'OK', {
          duration: 5000,
          verticalPosition: this.verticalPosition
        });
      },
      err => {
        console.log(err);
        if(err.status == 409) {
          this._snackBar.open('username or email is used', 'OK', {
            duration: 5000,
            verticalPosition: this.verticalPosition
          });
        }
      }
    )
  }

  onCancel() {
    this.router.navigate(['/app/users'])
  }

}
