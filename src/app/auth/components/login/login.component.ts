import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '@vetclinic-app/auth/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private _auth: AuthService, private _router: Router,
    private _snackBar: MatSnackBar) { }

  form: FormGroup = new FormGroup({});
  loginError= false;
  value3: string;
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });    
  }

  submit() {    
		this._auth.logIn(this.form.value.username, this.form.value.password)
		.subscribe((res: any) => {
			localStorage.setItem('token', res);
      this._auth.decodedToken(res);
			this._router.navigate(['/app/cases'])},
			err => {
        console.log(err);
        
        this._snackBar.open('invalid credentials', 'OK', {
          duration: 5000,
          verticalPosition: this.verticalPosition
        });
				this.loginError= true;
			}
		)
	}
}
