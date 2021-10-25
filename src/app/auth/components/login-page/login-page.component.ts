import { Component, OnInit } from '@angular/core';
import { ILoginCredentials } from '@vetclinic-app/auth/model/loginCredentials.model';

@Component({
  selector: 'app-login-page',
  template: 'testlogin'
})
export class LoginPageComponent implements OnInit {

  constructor() { }



  onSubmit(credentials: ILoginCredentials) {

  }

  ngOnInit(): void {

  }

}
