import { Component, OnInit } from '@angular/core';
import { AuthService } from '@vetclinic-app/auth/services/auth.service';
import { NavigationService } from '../navigation/navigation.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(private _navigationService: NavigationService, public _authService: AuthService) { }

  toggleMenuMobile() {
    this._navigationService.toggleSidenav()
  }

  toggleSidebarOpen(gfgfd) {

  }
  logout() {
    // this._authService.logout();
  }

  ngOnInit(): void {
  }

}
