import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ApiService } from '../api.service';
import { PetService } from './pet-service';

@Injectable({
  providedIn: 'root'
})
export class PetServiceResolver implements Resolve<PetService> {
  constructor(private api: ApiService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PetService> {
    return this.api.get('/api/petservices/' + route.params.id);
  }
}
