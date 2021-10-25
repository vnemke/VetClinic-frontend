import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './auth/components/login-page/login-page.component';

const routes: Routes = [
  {
    path: 'app',
    loadChildren: () => import('./layout/core-app.module').then(m => m.CoreAppModule),
    data: { canAccess: ['*'] },
    //canActivate: [AuthenticationGuard]
  },
  {
    path: 'auth',
    redirectTo: 'auth/login',
    data: { canAccess: ['*'] }
  },
  {
    path: 'auth/login',
    component: LoginPageComponent,
    data: { canAccess: ['*'] }
  },
  {
    path: '**',
    redirectTo: 'app/application-form'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
