import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { NavigationItem } from '@vetclinic-app/layout/model';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss']
})
export class NavItemComponent implements OnInit {

  constructor() { }

  @HostBinding('class')
  classes = 'nav-item';

  @Input()
  item: NavigationItem;

  ngOnInit(): void {
  }

}
