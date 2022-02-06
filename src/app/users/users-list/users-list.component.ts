
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Table } from 'primeng/table';
import { User } from '../User';
import { Role } from '../Role';
import { AuthService } from '@vetclinic-app/auth/services/auth.service';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  users: User[] = [];
  roles: Role[] = [];
  showAll: boolean;

  @ViewChild('dt1') dt: Table;

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  constructor(private route: ActivatedRoute, private _auth: AuthService, public router: Router) {}
  
  ngOnInit(): void {
   this.users = this.route.snapshot.data.users;
   this.roles = this.route.snapshot.data.roles
   console.log(this.route.snapshot);
   console.log(this.users);
   
   this.showAll = false;
  }

  onEditedUser(user: User): void {
    var res = this.users.findIndex(u => u.id == user.id);
    this.users[res] = user;    
  }
  // replacing old user with new edited user 

  onDeletedUser(user: User): void {
    var res = this.users.findIndex(u => u.id == user.id);
    this.users.splice(res, 1);
  }  
  // deleting user and make new array

  onShowAll() {
   
    if (!this.showAll) {
      this.showAll = true;
    } else {
      this.showAll = false;
    }
  }

  onAddUser() {
    this.router.navigate(['/app/users/add'])
  }
}
