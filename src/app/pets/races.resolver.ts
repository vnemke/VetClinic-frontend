import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ApiService } from '../core/services/api.service';
import { Race } from './race';

@Injectable({
  providedIn: 'root'
})
export class RacesResolver implements Resolve<Race[]> {
  constructor(private api: ApiService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Race[]> {
    return this.api.get('/api/races')
  }
}
