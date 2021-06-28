import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { NewUserComponent } from './new-user/new-user.component';
import { SharedModule } from '../../shared/shared.module';
import { EditUserComponent } from './edit-user/edit-user.component';
import { getAllRoles } from './roles.resolver';
import { getAllUsers } from './users.resolver';
import { DeleteUserComponent } from './edit-user/delete-user/delete-user.component';
import { MatDialogModule } from '@angular/material/dialog';




const routes: Routes = [
    {
        path: '',
        component: UsersListComponent,
        resolve: {
            users: getAllUsers,
            roles: getAllRoles
        }
    },
    {
        path: 'add',
        component: NewUserComponent,
        resolve: {
            users: getAllUsers,
            roles: getAllRoles
        }
    },
]

@NgModule({
	declarations: [
		UsersListComponent,
        NewUserComponent,
        EditUserComponent,
        DeleteUserComponent
	],
	imports: [
		RouterModule.forChild(routes),
        SharedModule,
        MatDialogModule
	],
    providers: [getAllRoles],
    entryComponents: [DeleteUserComponent]
})
export class UsersModule {}