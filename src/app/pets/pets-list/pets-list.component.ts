import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pet } from '../pet';
import { Animal } from '../animal';
import { Owner } from '../owner';
import { Race } from '../race'
import { Table } from 'primeng/table';

@Component({
  selector: 'app-pets-list',
  templateUrl: './pets-list.component.html',
  styleUrls: ['./pets-list.component.scss']
})
export class PetsListComponent implements OnInit {
  pets: Pet[] = [];
  animals: Animal[] = [];
  owners: Owner[] = [];
  races: Race[] = [];
  @ViewChild('dt1') dt: Table;


  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
  // search logic ngprime 

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.pets = this.route.snapshot.data.pets;
    this.animals = this.route.snapshot.data.animals;
    this.owners = this.route.snapshot.data.owners;
    this.races = this.route.snapshot.data.races;
    
    console.log(this.route.snapshot);
  }

}
