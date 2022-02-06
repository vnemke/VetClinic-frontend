import { Injectable } from '@angular/core';
import { ApiService } from '@vetclinic-app/core/services/api.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { AuthData } from '../model/authData.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  isAuth: boolean;
  token: string | null;
  username: string;
  role: string;
  fullName: string;
  
  constructor(private api: ApiService, private _router: Router) {

    this.token = localStorage.getItem('token') || '';

    if(localStorage.getItem('token')) {
      
      this.decodedToken(this.token)
      
		} else {
			// this.isAuth = false;
		}
  }

  decodedToken(token) {
    var helper = new JwtHelperService();
    var decodedToken = helper.decodeToken(token);
    console.log(decodedToken);

    this.role = decodedToken.role;
    this.username = decodedToken.username;  
    this.fullName = decodedToken.fullName;    
  }

  isTokenValid() {
    var helper = new JwtHelperService();
    return this.getToken() && !helper.isTokenExpired(this.getToken())
  }

  checkAccess(accessRoles: Array<string>): Boolean {
    if (accessRoles[0] == "*") {
      return true;
    } else if(accessRoles.indexOf(this.role)>-1) {      
      return true
    } else {
      return false
    }
  }

  getToken() {
		return localStorage.getItem('token') || '';
	}

	logIn(username: string, password: string) {
		const authData: AuthData = {username: username, password: password}
		return this.api.post('/api/auth/login', authData)
	}

  // loggedIn() {
	// 	return localStorage.getItem('token');
	// }

  logout() {
    localStorage.removeItem('token');
    this.fullName = '';
    this.role = '';
    this._router.navigate(['/auth/login']);
  }
}
