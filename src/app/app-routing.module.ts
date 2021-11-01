import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';

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
    component: LoginComponent,
    data: { canAccess: ['*'] }
  },
  {
    path: '**',
    redirectTo: 'app/cases'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
