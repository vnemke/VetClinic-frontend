import { HttpClient } from '@angular/common/http';
import { splitClasses } from '@angular/compiler';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Table } from 'primeng/table';
import { Observable } from 'rxjs';
import { ApiService } from '../../api.service';
import { User } from '../User'


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  users: User[] = []  
  url: string = "/api/users"
  
  @ViewChild('dt1') dt: Table | undefined;

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  constructor(private api: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
   this.users = this.route.snapshot.data.users;
   console.log(this.route.snapshot);
   
    
    this.api.get<User[]>(this.url)
    .subscribe(
      res => { 
        this.users = res
      }   
    )
  }

  onEditedUser(user: User): void {
    var res = this.users.findIndex(u => u.id == user.id);
    this.users[res] = user
  }

  onDeletedUser(user: User): void {
    var res = this.users.findIndex(u => u.id == user.id);
    this.users.splice(res, 1);
  }  
}
