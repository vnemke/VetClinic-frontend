import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { navigation } from './navigation'
import { NavigationItem } from '../model/navigation.model';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor() {
    this.navState = localStorage.getItem('navState');
    if (this.navState && this.navState == 'docked') {
      this._sidenavStateChange$ = new BehaviorSubject<boolean>(false);
      this.isSidenavOpen = false;
    }
    else {
      this._sidenavStateChange$ = new BehaviorSubject<boolean>(true);
      this.isSidenavOpen = true;
    }

    this.sidenavStateChange$ = this._sidenavStateChange$.asObservable();

    this.isMobile = false;

    this.navigation = navigation;

    this._sideNavLoaded$ = new BehaviorSubject<boolean>(true);
    this.sideNavLoaded$ = this._sideNavLoaded$.asObservable();

    this.onItemCollapsed$ = new Subject();
    this.onItemCollapseToggled$ = new Subject();
  }

  navState: null | string;
  isSidenavOpen: boolean;
  isMobile: boolean;

  private _sidenavStateChange$: BehaviorSubject<boolean>;
  sidenavStateChange$: Observable<boolean>;

  private _sideNavLoaded$: BehaviorSubject<boolean>;
  sideNavLoaded$: Observable<boolean>;

  onItemCollapsed$: Subject<any>;
  onItemCollapseToggled$: Subject<any>;




  navigation: NavigationItem[];


  saveSidenavState(state) {
    if (state) {
      setTimeout(function () { localStorage.setItem('navState', 'open') }, 0)
    }
    else {
      setTimeout(function () { localStorage.setItem('navState', 'docked') }, 0)
    }
  }

  toggleSidenav() {
    this._sidenavStateChange$.next(!this.isSidenavOpen);
    this.isSidenavOpen = !this.isSidenavOpen;
    this.saveSidenavState(this.isSidenavOpen);
  }

  changeSidenavState(state: boolean) {
    this._sidenavStateChange$.next(state);
    this.isSidenavOpen = state;
    this.saveSidenavState(state);
  }

}