import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../core/services/api.service';
import { Role } from './Role';


@Injectable()
export class getAllRoles implements Resolve<Role[]> {

	constructor(private api: ApiService) { }
	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Role[]> {
		return this.api.get('/api/roles');
	}
}
