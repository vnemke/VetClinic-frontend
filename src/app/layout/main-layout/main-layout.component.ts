import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { NavigationService } from '../navigation/navigation.service'
import { fadeInOutBackdrop } from '@vetclinic-app/shared/animations';
import { AuthService } from '@vetclinic-app/auth/services/auth.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  animations: fadeInOutBackdrop
})
export class MainLayoutComponent implements OnInit, OnDestroy {

  constructor(private _navigationService: NavigationService, @Inject(DOCUMENT) private _document: any, private _auth: AuthService) { }

  isMobile(): boolean {
    return this._navigationService.isMobile;
  }

  getSidenavState(): boolean {
    return this._navigationService.isSidenavOpen;
  }

  toggleSidenav() {
    this._navigationService.toggleSidenav();
  }



  ngOnInit(): void {

  }

  ngOnDestroy(): void {

  }

}
