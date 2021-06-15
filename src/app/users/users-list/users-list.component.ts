import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
  
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.get<User[]>(this.url)
    .subscribe(
      res => { 
        this.users = res
        console.log(res)
      }   
    )
  }
  
}
