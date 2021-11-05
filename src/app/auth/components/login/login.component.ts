import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { ILoginCredentials } from '@vetclinic-app/auth/model/loginCredentials.model';
import { AuthService } from '@vetclinic-app/auth/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private _auth: AuthService, private _router: Router) { }

  form: FormGroup = new FormGroup({});
  loginError= false;

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
        
				this.loginError= true;
			}
		)
	}

  // @Input() errorMessage!: string | null;
  // @Output() submitted = new EventEmitter<ILoginCredentials>();
  // @Input('pending')
  // set pending(isPending: boolean) {
  //   this.pendingResponse = isPending;
  //   if (isPending) {
  //     this.form.disable();
  //   } else {
  //     this.form.enable();
  //   }
  // }


  // submit() {
  //   if (this.form.valid) {
  //     this._auth.login(this.form.value).subscribe(resp => {
  //       // this._auth.setAuthUser(resp.token);
  //       this._router.navigate(['/app/dashboard']);
  //     })

  //   }
  // }

}
