import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ApiService } from '../api.service';
import { Vet } from './vet';

@Injectable({
  providedIn: 'root'
})
export class VetsResolver implements Resolve<Vet[]> {
  constructor(private api: ApiService) {}
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Vet[]> {
    return this.api.get('/api/vets');
  }
}
