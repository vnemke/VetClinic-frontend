import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { ApiService } from '@vetclinic-app/core/services/api.service';
import { PetService } from '@vetclinic-app/pet-services/pet-service';
import { Pet } from '@vetclinic-app/pets/pet';
import { Case } from '../case';
import { Control } from '../control';
import { Therapy } from '../therapy';
import { Vet } from '../vet';
import { Xray } from '../xray';
import { Animal } from '@vetclinic-app/pets/animal'
import { Race } from '@vetclinic-app/pets/race';

@Component({
  selector: 'app-new-case',
  templateUrl: './new-case.component.html',
  styleUrls: ['./new-case.component.scss']
})
export class NewCaseComponent implements OnInit {
 
  caseForm: FormGroup;
  therapyFormGroup: FormGroup;
  case: Case;
  pets: Pet[];
  animals: Animal[] = [];
  races: Race[] = []
  therapies: Therapy[];
  controls: Control[];
  xrays: Xray[];
  vets: Vet[];
  petServices: PetService[];
  filteredRaces: Race[] = [];
  filteredPets: Pet[] = [];
  selectedAnimal: boolean;
  selectedRace: boolean;
  selectedPet: boolean;
  selectedPetId: any;

  @ViewChild('fileUploader') fileUploader: any;

  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  
  constructor(private fb: FormBuilder, private api: ApiService, private route: ActivatedRoute, 
    public router: Router, public dialogService: DialogService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.case = this.route.snapshot.data.case;
    this.pets = this.route.snapshot.data.pets;
    this.animals = this.route.snapshot.data.animals;
    this.races = this.route.snapshot.data.races;
    this.therapies = this.route.snapshot.data.therapies;
    this.controls = this.route.snapshot.data.controls;
    this.xrays = this.route.snapshot.data.xrays;
    this.vets = this.route.snapshot.data.vets;
    this.petServices = this.route.snapshot.data.petServices;

    console.log(this.route.snapshot.data);
  
    this.caseForm = this.fb.group({
      name: ['', Validators.required],
      animalId: [null, Validators.required],
      raceId: [null,  Validators.required],
      petId: [null, Validators.required],
      diagnosis: [''],
      date: ['', Validators.required],
      vetCases: ['', Validators.required],
      casePetServices: ['', Validators.required],
      therapies: this.fb.array([]),
      controls: this.fb.array([])
    }); 

    //filter races and pets
    this.caseForm.get('animalId')?.valueChanges
    .subscribe(animalId => {
      if (animalId == null) {
        console.log('nula vrednost', animalId);
        this.filteredRaces = [];
        this.selectedAnimal = false;
      } else {
        var result = this.races.filter(r => r.animalId == animalId);
        console.log(result);
        this.filteredRaces = result;
        this.selectedAnimal = true;
      }
    })      
    
    this.caseForm.get('raceId')?.valueChanges
    .subscribe(raceId => {
      if (raceId == null) {
        console.log('nula vrednost', raceId);
        this.filteredPets = [];
        this.selectedRace = false;
      } else {
        var result = this.pets.filter(p => p.raceId == raceId);
        console.log('filpets',result);
        this.filteredPets = result;
        this.selectedRace = true;
        this.selectedPetId = null;
      }
    })

    this.caseForm.get('petId')?.valueChanges
    .subscribe((petId) => {
      if (petId == null) {
        this.selectedPet = false;
      } else {
        this.selectedPet = true;
        this.selectedPetId = petId;
      }
    })
  }

  //therapies form array
  get therapiesForm() {
    return this.caseForm.controls["therapies"] as FormArray;
  }

  addTherapiesForm() {
    const therapyFormGroup = this.fb.group({
      drug: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
    });
    this.therapiesForm.push(therapyFormGroup);
  }

  deleteTherapy(therapyIndex: number) {
    this.therapiesForm.removeAt(therapyIndex);
  }

  //controls form array 
  get controlsForm() {
    return this.caseForm.controls["controls"] as FormArray;
  }

  addConstrolsForm() {
    const controlFormGroup = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required]
    });
    this.controlsForm.push(controlFormGroup);
  }

  deleteControl(controlIndex: number) {
    this.controlsForm.removeAt(controlIndex);
  }

  onAddCase() {
    console.log('form', this.caseForm.value)

    var body = { ...this.caseForm.value, xrays: this.fileUploader.getUploaded() }
    body.vetCases = body.vetCases.map((vetIdArg: any) => {
      return {vetId: vetIdArg}
    })
    body.casePetServices = body.casePetServices.map((ServiceIdArg: any) => {
      return {petServiceId: ServiceIdArg}
    })
    this.api.post("/api/cases/", body)
    .subscribe(
      () => {
        this.router.navigate(['/app/cases']) 
        this._snackBar.open('Case is aded', 'OK', {
          duration: 5000,
          verticalPosition: this.verticalPosition
        });
      }
    )
  }
 
  onCancel() {
    this.router.navigate(['/app/cases'])
  }
}
