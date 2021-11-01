import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { LoginComponent } from './components/login/login.component';
import { LoginPageComponent } from './components/login-page/login-page.component';

@NgModule({
  declarations: [
    LoginComponent,
    LoginPageComponent
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    LoginComponent,
    LoginPageComponent
  ]
})
export class AuthModule { }
