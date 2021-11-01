import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ApiService } from '../core/services/api.service';
import { Owner } from './owner';

@Injectable({
  providedIn: 'root'
})
export class OwnersResolver implements Resolve<Owner[]> {
  constructor(private api: ApiService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Owner[]> {
    return this.api.get('/api/owners');
  }
}
