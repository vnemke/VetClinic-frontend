import { NgModule } from '@angular/core';
import { PetsListComponent } from './pets-list/pets-list.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/shared/shared.module';
import { PetsResolver } from './pets.resolver';
import { AnimalsResolver } from './animals.resolver';
import { OwnersResolver } from './owners.resolver';
import { RacesResolver } from './races.resolver';
import { NewPetComponent } from './new-pet/new-pet.component';
import { EditPetComponent } from './edit-pet/edit-pet.component';
import { PetResolver } from './pet.resolver';

const routes: Routes = [
  {
    path: '',
    component: PetsListComponent,
    resolve: {
      pets: PetsResolver,
      animals: AnimalsResolver,
      owners: OwnersResolver,
      races: RacesResolver
    }
  },
  {
    path: 'add',
    component: NewPetComponent,
    resolve: {
      pets: PetsResolver,
      animals: AnimalsResolver,
      owners: OwnersResolver,
      races: RacesResolver
    }
  },
  {
    path: ':id',
    component: EditPetComponent,
    resolve: {
      pets: PetsResolver,
      pet: PetResolver,
      animals: AnimalsResolver,
      owners: OwnersResolver,
      races: RacesResolver
    }
  }
];

@NgModule({
  declarations: [
    PetsListComponent,
    NewPetComponent,
    EditPetComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class PetsModule { }
