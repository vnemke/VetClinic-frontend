import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ApiService } from '../core/services/api.service';
import { Therapy } from './therapy';

@Injectable({
  providedIn: 'root'
})
export class TherapiesResolver implements Resolve<Therapy[]> {
  constructor(private api: ApiService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Therapy[]> {
    return this.api.get('/api/therapies');
  }
}
