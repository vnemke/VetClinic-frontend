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

  form: FormGroup = new FormGroup({})
  pendingResponse: boolean = false;

  @Input() errorMessage!: string | null;
  @Output() submitted = new EventEmitter<ILoginCredentials>();
  @Input('pending')
  set pending(isPending: boolean) {
    this.pendingResponse = isPending;
    if (isPending) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }


  // submit() {
  //   if (this.form.valid) {
  //     this._auth.login(this.form.value).subscribe(resp => {
  //       // this._auth.setAuthUser(resp.token);
  //       this._router.navigate(['/app/dashboard']);
  //     })

  //   }
  // }


  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

}
