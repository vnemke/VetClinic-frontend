import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { EditPetServiceComponent } from './edit-pet-service/edit-pet-service.component';
import { NewPetServiceComponent } from './new-pet-service/new-pet-service.component';
import { PetServiceResolver } from './pet-service.resolver';
import { PetServicesListComponent } from './pet-services-list/pet-services-list.component';
import { PetServicesResolver } from './pet-services.resolver';


const routes: Routes = [
  {
    path: '',
    component: PetServicesListComponent,
    resolve: {
      petServices: PetServicesResolver
    }
  },
  {
    path: 'add',
    component: NewPetServiceComponent,
    resolve: {
      petServices: PetServicesResolver
    }
  },
  {
    path: ':id',
    component: EditPetServiceComponent,
    resolve: {
      petServices: PetServicesResolver,
      petService: PetServiceResolver
    }
  }
];

@NgModule({
  declarations: [
    PetServicesListComponent,
    NewPetServiceComponent,
    EditPetServiceComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class PetServicesModule { }
