import { NgModule } from '@angular/core';
import { PetsListComponent } from './pets-list/pets-list.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/shared/shared.module';
import { PetsResolver } from './pets.resolver';
import { AnimalsResolver } from './animals.resolver';
import { OwnersResolver } from './owners.resolver';
import { RacesResolver } from './races.resolver';

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
  }
]

@NgModule({
  declarations: [
    PetsListComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class PetsModule { }
