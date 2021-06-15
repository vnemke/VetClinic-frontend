import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { NewUserComponent } from './new-user/new-user.component';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
    {
        path: '',
        component: UsersListComponent
    },
    {
        path: 'add',
        component: NewUserComponent
    }
]

@NgModule({
	declarations: [
		UsersListComponent,
        NewUserComponent
	],
	imports: [
		RouterModule.forChild(routes),
        SharedModule
	],
})
export class UsersModule {}