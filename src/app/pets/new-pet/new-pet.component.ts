import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Animal } from '../animal';
import { Owner } from '../owner';
import { Pet } from '../pet';
import { Race } from '../race';

@Component({
  selector: 'app-new-pet',
  templateUrl: './new-pet.component.html',
  styleUrls: ['./new-pet.component.scss']
})
export class NewPetComponent implements OnInit {
  pet: Pet;
  pets: Pet[] = [];
  animals: Animal[] = [];
  owners: Owner[] = [];
  races: Race[] = [];
  filteredRaces: Race[] = [];
  selectedAnimal: boolean;
  newOwner: boolean;
  selectedValue: string='female';

  petForm: FormGroup;
  ownerForm: FormGroup;
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private fb: FormBuilder, private api: ApiService, public route: ActivatedRoute,
    public router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.pets = this.route.snapshot.data.pets;
    this.animals = this.route.snapshot.data.animals;
    this.owners = this.route.snapshot.data.owners;
    this.races = this.route.snapshot.data.races;
    
    console.log(this.route.snapshot);    

    this.petForm = this.fb.group({
      name: ['', Validators.required],
      sex: ['',  Validators.required],
      year: ['',  Validators.required],
      animalId: [null, Validators.required],
      raceId: [null,  Validators.required],
      ownerId: [null, Validators.required]
    });

    this.petForm.get('animalId')?.valueChanges
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

    this.ownerForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      idCard: [''],
      address: [''],
      email: [''],
      phone: ['']
    })
  }

  onNewOwner() {
    this.newOwner = true;
    this.petForm.controls['ownerId'].disable();
  }  

  onCancelNewOwner() {
    this.newOwner = false;
    this.petForm.controls['ownerId'].enable();
  }

  onAddPet() {
    var body = { pet: this.petForm.value, owner: this.ownerForm.value }
    console.log('forma',body);

    if(this.newOwner) {
      this.api.post("/api/pets/petWithOwner", body)
      .subscribe(
        () => {
          this.router.navigate(['pets'])
          this._snackBar.open('Pet is added', 'End now', {
            duration: 5000,
            verticalPosition: this.verticalPosition
          });
        }
      )
    } else {
      this.api.post("/api/pets", this.petForm.value)
      .subscribe(
        () => {
          this.router.navigate(['pets'])
          this._snackBar.open('Pet is added', 'End now', {
            duration: 5000,
            verticalPosition: this.verticalPosition
          });
          console.log(this.petForm.value);
        }
      )
    }
  }

  onCancel() {
    this.router.navigate(['pets'])
  }

}
