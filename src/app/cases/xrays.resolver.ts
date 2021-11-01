import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ApiService } from '../core/services/api.service';
import { Xray } from './xray';

@Injectable({
  providedIn: 'root'
})
export class XraysResolver implements Resolve<Xray[]> {
  constructor(private api: ApiService) {}
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Xray[]> {
    return this.api.get('/api/xrays');
  }
}
