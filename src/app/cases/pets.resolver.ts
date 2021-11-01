import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ApiService } from '../core/services/api.service';
import { Pet } from './pet';

@Injectable({
  providedIn: 'root'
})
export class PetsResolver implements Resolve<Pet[]> {
  
  constructor(private api: ApiService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Pet[]> {
    return this.api.get('/api/vets');
  }
}
