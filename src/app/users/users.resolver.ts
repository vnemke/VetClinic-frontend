import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ApiService } from '../core/services/api.service';
import { User } from './User'

@Injectable({
  providedIn: 'root'
})
export class getAllUsers implements Resolve<User[]> {

  constructor(private api: ApiService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User[]> {
    return this.api.get('/api/users');
  }
}
