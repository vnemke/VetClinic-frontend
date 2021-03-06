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
import { formatDate } from '@angular/common';

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
  filteredAnimals: Animal[] = [];
  filteredRaces: Race[] = [];
  filteredPets: Pet[] = [];
  selectedAnimal: boolean;
  selectedRace: boolean;
  selectedPetId: any;
  date1: string;

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
      raceId: [{value: null, disabled: !this.selectedAnimal}, Validators.required],
      petId: [{value: null, disabled: !this.selectedRace}, Validators.required],
      diagnosis: [''],
      date: ['', Validators.required],
      vetCases: ['', Validators.required],
      casePetServices: ['', Validators.required],
      controls: this.fb.array([]),
      therapies: this.fb.array([])
    });

    //default date(current date)
    var today = new Date();
    this.date1 = today.getDate()+'/'+ today.getMonth()+'/'+today.getFullYear();
    this.caseForm.controls.date.setValue(this.date1);
    console.log(this.date1);
    
    //filter races and pets
    this.caseForm.get('animalId')?.valueChanges
    .subscribe(animalId => {
      console.log('value', animalId);
      if (animalId == null) {
        this.selectedAnimal = false;
        this.caseForm.controls['raceId'].disable();
      } else {   
        var result = this.races.filter(r => r.animalId == animalId);
        console.log(result); 
        this.filteredRaces = result;
        this.selectedAnimal = true;
        this.caseForm.controls['raceId'].enable();
        this.caseForm.controls['raceId'].reset();
      }
    })   
    
    this.caseForm.get('raceId')?.valueChanges
    .subscribe(raceId => {
      console.log('race val', raceId);
      if (raceId == null) {
        this.filteredPets = [];
        this.caseForm.controls['petId'].disable();
      } else {
        var result = this.pets.filter(p => p.raceId == raceId);
        console.log('filpets',result);
        this.filteredPets = result;
        this.caseForm.controls['petId'].enable();
        this.caseForm.controls['petId'].reset();       
      }
    });       
    
    this.caseForm.get('petId')?.valueChanges
    .subscribe((petId) => {
      if (petId == null) {
        console.log('petval', petId);
        this.selectedPetId = null; 
      } else {
        this.selectedPetId = petId;
      }
    })
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
