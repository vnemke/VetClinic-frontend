import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ApiService } from '../api.service';
import { Case } from './case';

@Injectable({
  providedIn: 'root'
})
export class CaseResolver implements Resolve<Case> {
  constructor(private api: ApiService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Case> {
    return this.api.get('/api/cases/' + route.params.id);
  }
}
