import { Component, OnInit, HostBinding, ElementRef, Renderer2, OnDestroy, AfterViewInit } from '@angular/core';
import { NavigationService } from '../navigation.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { skip, take, delay } from 'rxjs/operators';
import { NavigationItem } from '@vetclinic-app/layout/model';
import { AuthService } from '@vetclinic-app/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy, AfterViewInit {


  constructor(private _elementRef: ElementRef, private _renderer: Renderer2, private _navigationService: NavigationService, private _breakPointObserver: BreakpointObserver, public _authService: AuthService) {

    this.navigation = this._navigationService.navigation;
  }
  @HostBinding('class.app-navbar') appNavbar = true;
  @HostBinding('class.navbar-open') open: boolean;
  @HostBinding('class.docked') docked: boolean;
  @HostBinding('class.initial-load') initialLoad = true;

  navigation: NavigationItem[];

  isSmallScreen$: Subscription;
  sidenavState$: Subscription;
  sibling: any;
  overlay: any;


  toggleState(state) {
    if (state) {
      this._renderer.addClass(document.body, 'nav-open');
    }
    else {
      this._renderer.removeClass(document.body, 'nav-open');
    }

    this.open = state;
    this.docked = !state;
  }

  toggleOpenClosed(state: boolean) {

    this.toggleState(state);
    if (this._navigationService.isMobile) {
      this._renderer.removeStyle(this.sibling, 'padding-left');
    }
    else {
      if (this.docked) {
        this._renderer.setStyle(this.sibling, 'padding-left', '64px');
      }
      else {
        this._renderer.setStyle(this.sibling, 'padding-left', '258px')
      }
    }
  }

  toggleSidenav() {
    this._navigationService.toggleSidenav();
  }

  setInitialMobileState() {

    this.toggleState(false)
    if (this._navigationService.isMobile) {
      this._renderer.removeStyle(this.sibling, 'padding-left');
    }
    else {
      this._renderer.setStyle(this.sibling, 'padding-left', '64px')
    }

  }

  setInitialDesktopState() {
    if (this._navigationService.isSidenavOpen) {
      this._renderer.setStyle(this.sibling, 'padding-left', '258px');
      this.toggleState(true);
    }
    else {
      this._renderer.setStyle(this.sibling, 'padding-left', '64px')
      this.toggleState(false);
    }
  }

  isAuth(accessRoles: Array<string>): boolean {
    if(accessRoles) {
      if (accessRoles[0] == "*") {
        return true;
      } else if(accessRoles.indexOf(this._authService.role)>-1) {      
        return true
      } else {
        return false
      }
    } else {
      return false
    }
    
  }

  ngOnInit(): void {

    this.sibling = this._elementRef.nativeElement.nextElementSibling;
    this.isSmallScreen$ = this._breakPointObserver.observe('(max-width: 768px)')
      .subscribe(
        (result) => {
          if (result.matches) {
            this._navigationService.isMobile = true;
            this.setInitialMobileState();
            this._navigationService.isSidenavOpen = false;
          }
          else {
            this._navigationService.isMobile = false;
            this.setInitialDesktopState();
          }
        });

    this.sidenavState$ = this._navigationService.sidenavStateChange$.pipe(skip(1)).subscribe(//Skip da bi ga prvi put handlovao breakPointObserver
      (value) => {
        this.toggleOpenClosed(value);
      }
    );

  }
  ngOnDestroy(): void {
    this.isSmallScreen$.unsubscribe();
    this.sidenavState$.unsubscribe();
  }

  ngAfterViewInit() {

    this._navigationService.sideNavLoaded$.pipe(delay(550), take(1)).subscribe(
      value => this.initialLoad = false
    )

  }

}
