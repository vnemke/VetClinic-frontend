import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Table } from 'primeng/table';
import { PetService } from '../pet-service';

@Component({
  selector: 'app-pet-services-list',
  templateUrl: './pet-services-list.component.html',
  styleUrls: ['./pet-services-list.component.scss']
})
export class PetServicesListComponent implements OnInit {

  petService: PetService;
  petServices: PetService[] = [];

  @ViewChild('dt1') dt: Table;

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  constructor(private route: ActivatedRoute, public router: Router) { }

  ngOnInit(): void {
    this.petService = this.route.snapshot.data.petService;
    this.petServices = this.route.snapshot.data.petServices;
    console.log(this.petServices);
    
  }

  onAddService() {
    this.router.navigate(['pet-services/add'])
  }

}
