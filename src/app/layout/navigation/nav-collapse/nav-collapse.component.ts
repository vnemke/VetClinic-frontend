import { Component, OnInit, Input, HostBinding, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationItem } from '@vetclinic-app/layout/model';
import { NavigationService } from '../navigation.service'
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { slideInOut } from '@vetclinic-app/shared/animations';


@Component({
  selector: 'app-nav-collapse',
  templateUrl: './nav-collapse.component.html',
  styleUrls: ['./nav-collapse.component.scss'],
  animations: slideInOut
})
export class NavCollapseComponent implements OnInit, OnDestroy {

  constructor(private _navigationService: NavigationService, private _changeDetectorRef: ChangeDetectorRef, private _router: Router) {
    this._unsubscribeAll = new Subject();
  }


  private _unsubscribeAll: Subject<any>;
  @Input() item: NavigationItem;
  @HostBinding('class') classes = 'nav-collapsable nav-item';

  @HostBinding('class.open') public isOpen = false;


  toggleOpen(e): void {
    e.preventDefault();

    this.isOpen = !this.isOpen;

    // Navigation collapse toggled...
    this._navigationService.onItemCollapsed$.next(this.item);
    this._navigationService.onItemCollapseToggled$.next();
  }


  isChildrenOf(parent, item): boolean {
    const children = parent.children;

    if (!children) {
      return false;
    }

    if (children.indexOf(item) > -1) {
      return true;
    }

    for (const child of children) {
      if (child.children) {
        if (this.isChildrenOf(child, item)) {
          return true;
        }
      }
    }

    return false;
  }

  collapse(): void {
    if (!this.isOpen) {
      return;
    }

    this.isOpen = false;

    // Mark for check
    this._changeDetectorRef.markForCheck();

    this._navigationService.onItemCollapseToggled$.next();
  }


  isUrlInChildren(parent, url): boolean {
    const children = parent.children;

    if (!children) {
      return false;
    }

    for (const child of children) {
      if (child.children) {
        if (this.isUrlInChildren(child, url)) {
          return true;
        }
      }

      if (child.url === url || url.includes(child.url)) {
        return true;
      }
    }

    return false;
  }


  ngOnInit(): void {
    this._navigationService.onItemCollapsed$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (clickedItem) => {
          if (clickedItem && clickedItem.children) {
            // Check if the clicked item is one
            // of the children of this item
            if (this.isChildrenOf(this.item, clickedItem)) {
              return;
            }

            // Check if the url can be found in
            // one of the children of this item
            if (this.isUrlInChildren(this.item, this._router.url)) {
              return;
            }

            // If the clicked item is not this item, collapse...
            if (this.item !== clickedItem) {
              this.collapse();
            }
          }
        }
      );
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
