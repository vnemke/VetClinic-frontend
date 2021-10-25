import { Injectable } from '@angular/core';
import { ILoginCredentials, IAuthResponse } from '../model';
// import { ApiService } from '../../core/services/api.service';
// import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
// import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

//   constructor(private api: ApiService, private _router: Router) {
//     this.jwtHelper = new JwtHelperService();
//     const token = this.getDecodedToken();
//     if (token) {
//       this.setUser(token);
//     }
//   }
//   jwtHelper: JwtHelperService;
//   private serviceEndpoint = 'auth';
//   private storageKey = '_sessionToken';
//   public user: any;
//   public role = '';
//   public roleClass = '';
//   public avColor = '#E9B750';
//   public roles: any[];


//   getStorageKey(): string {
//     return this.storageKey;
//   }

//   login(credentials: ILoginCredentials) {
//     return this.api.post<IAuthResponse>('auth/login', credentials);
//   }

//   setAuthUser(token) {
//     localStorage.setItem('_sessionToken', token);
//     this.setUser(this.getDecodedToken());
//   }
//   setUser(token) {
//     this.roles = token.roles.map(role => role.name);
//     this.user = token;
//     if (this.user.avatarUrl) {
//       this.user.avatarUrl = environment.staticUrl + this.user.avatarUrl;
//     }
//     let delegate = true;
//     this.role = 'Delegate';
//     this.roleClass = 'delegate';
//     for (let role of token.roles) {
//       if (role.name == 'committee') {
//         delegate = false;
//         this.role = 'Committee Member';
//         this.roleClass = 'committee';
//         this.avColor = '#0e85b3';
//         break;
//       }
//       else if (role.name == 'research') {
//         this.role = 'Research';
//         this.roleClass = 'research';
//       }
//     }
//     console.log(this.role);
//   }
//   logout() {
//     localStorage.removeItem('_sessionToken');
//     this._router.navigate(['/auth/login']);
//   }

//   getStorageToken(): string {
//     return localStorage.getItem(this.storageKey) || '';
//   }

//   isTokenValid(): boolean {
//     return this.getStorageToken() && !this.jwtHelper.isTokenExpired(this.getStorageToken())
//   }
//   getDecodedToken(): any {
//     return this.jwtHelper.decodeToken(this.getStorageToken());
//   }

//   checkAccess(accessRoles: Array<string>): boolean {
//     if (accessRoles[0] == "*") return true;

//     //return accessRoles.indexOf(this.appUser.role)>-1;
//   }

}
