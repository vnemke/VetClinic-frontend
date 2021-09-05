import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CasesListComponent } from './cases-list/cases-list.component';
import { NewCaseComponent } from './new-case/new-case.component';
import { EditCaseComponent } from './edit-case/edit-case.component';
import { SharedModule } from 'src/shared/shared.module';
import { CasesResolver } from './cases.resolver';
import { CaseResolver } from './case.resolver';
import { CaseDetailsComponent } from './case-details/case-details.component';
import { ControlsResolver } from './controls.resolver';
import { TherapiesResolver } from './therapies.resolver';
import { XraysResolver } from './xrays.resolver';
import { VetsResolver } from './vets.resolver';
import { PetServicesResolver } from './pet-services.resolver';
import { PetsResolver } from '../pets/pets.resolver';

const routes: Routes = [
  {
    path: '',
    component: CasesListComponent,
    resolve: {
      cases: CasesResolver,
      therapies: TherapiesResolver,
      controls: ControlsResolver,
      xrays: XraysResolver,
      vets: VetsResolver,
      petServices: PetServicesResolver
    }
  },
  {
    path: 'add',
    component: NewCaseComponent,
    resolve: {
      cases: CasesResolver,
      pets: PetsResolver,
      therapies: TherapiesResolver,
      controls: ControlsResolver,
      xrays: XraysResolver,
      vets: VetsResolver,
      petServices: PetServicesResolver
    }
  },
  {
    path: ':id',
    component: CaseDetailsComponent,
    resolve: {
      case: CaseResolver,
      pets: PetsResolver,
      therapies: TherapiesResolver,
      controls: ControlsResolver,
      xrays: XraysResolver,
      vets: VetsResolver,
      petServices: PetServicesResolver
    }
  },
  {
    path: 'edit/:id',
    component: EditCaseComponent,
    resolve: {
      case: CaseResolver,
      pets: PetsResolver,
      therapies: TherapiesResolver,
      controls: ControlsResolver,
      xrays: XraysResolver,
      vets: VetsResolver,
      petServices: PetServicesResolver
    }
  }
];


@NgModule({
  declarations: [
    CasesListComponent,
    NewCaseComponent,
    CaseDetailsComponent,
    EditCaseComponent,
    CaseDetailsComponent

  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CasesModule { }
