import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ApiService } from '../core/services/api.service';
import { Animal } from './animal';

@Injectable({
  providedIn: 'root'
})
export class AnimalsResolver implements Resolve<Animal[]> {
  constructor(private api: ApiService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Animal[]> {
    return this.api.get('/api/animals')
  }
}
