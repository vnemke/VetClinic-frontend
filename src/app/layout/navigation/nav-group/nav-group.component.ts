import { Component, OnInit, Input } from '@angular/core';
import { NavigationItem } from '@vetclinic-app/layout/model';

@Component({
  selector: 'app-nav-group',
  templateUrl: './nav-group.component.html',
  styleUrls: ['./nav-group.component.scss']
})
export class NavGroupComponent implements OnInit {

  constructor() { }

  @Input() item: NavigationItem;


  ngOnInit(): void {
  }

}
