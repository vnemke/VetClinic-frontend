import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

import { MainLayoutComponent } from './main-layout/main-layout.component';
import { NavbarComponent } from './navigation/navbar/navbar.component';
import { NavCollapseComponent } from './navigation/nav-collapse/nav-collapse.component';
import { NavItemComponent } from './navigation/nav-item/nav-item.component';
import { NavGroupComponent } from './navigation/nav-group/nav-group.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

// import { AuthenticationGuard } from '/src/app/auth/guards/authentication.guard';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    //canActivate: [AuthenticationGuard],
    children: [
        {
          path: 'users',
          loadChildren: () => import('../users/users.module').then(m => m.UsersModule)
        },
        {
          path: 'pets',
          loadChildren: () => import('../pets/pets.module').then(m => m.PetsModule)
        },
        {
          path: 'pet-services',
          loadChildren: () => import('../pet-services/pet-services.module').then(m => m.PetServicesModule)
        },
        {
          path: 'cases',
          loadChildren: () => import('../cases/cases.module').then(m => m.CasesModule)
        }
    ]
  }
];

@NgModule({
  declarations: [
    MainLayoutComponent,
    NavbarComponent,
    NavCollapseComponent,
    NavItemComponent,
    NavGroupComponent,
    ToolbarComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [MainLayoutComponent],

})
export class CoreAppModule { }
