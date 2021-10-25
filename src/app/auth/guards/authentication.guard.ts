import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, take } from "rxjs/operators";
import { AuthService } from '../services/auth.service';



@Injectable()
export class AuthenticationGuard implements CanActivate {

     constructor(private router: Router, private authService: AuthService) { }

     canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

          //return of(true);

          const accessRoles: Array<string> = route.data['canAccess'];
          if (this.authService.isTokenValid() /*&& this.auth.appUser[claimType]*/) { //proveriti mozda u if-u
               if (this.authService.checkAccess(accessRoles)) {
                    return true;
               }
               else {
                    this.router.navigate([state.url]);
                    return false;
               }

          }
          else {
               this.router.navigate(['/auth/login']);
               return false;
          }

     }
}