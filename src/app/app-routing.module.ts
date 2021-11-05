import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { AuthenticationGuard } from './auth/guards/authentication.guard';

const routes: Routes = [
  {
    path: 'app',
    loadChildren: () => import('./layout/core-app.module').then(m => m.CoreAppModule),
    data: { canAccess: ['*'] },
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'auth',
    redirectTo: 'auth/login'  
  },
  {
    path: 'auth/login',
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: 'app/cases'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule],
  providers: [AuthenticationGuard]
})
export class AppRoutingModule { }
