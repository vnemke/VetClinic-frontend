import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ApiService } from '../api.service';
import { Control } from './control';

@Injectable({
  providedIn: 'root'
})
export class ControlsResolver implements Resolve<Control[]> {
  constructor(private api: ApiService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Control[]> {
    return this.api.get('/api/controls');
  }
}
