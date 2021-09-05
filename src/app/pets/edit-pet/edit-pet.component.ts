import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { ApiService } from 'src/app/api.service';
import { ModalComponent } from 'src/app/modal/modal.component';
import { Animal } from '../animal';
import { Owner } from '../owner';
import { Pet } from '../pet';
import { Race } from '../race';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-edit-pet',
  templateUrl: './edit-pet.component.html',
  styleUrls: ['./edit-pet.component.scss']
})
export class EditPetComponent implements OnInit {
  petForm: FormGroup;
  pet: Pet;
  pets: Pet[] = [];
  animal: Animal;
  animals: Animal[] = [];
  owners: Owner[] = [];
  races: Race[] = [];
  filteredRaces: Race[] = [];
  selectedAnimal: boolean = true;
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private fb: FormBuilder, private api: ApiService, public route: ActivatedRoute,
    public router: Router, public dialogService: DialogService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.animals = this.route.snapshot.data.animals;
    this.owners = this.route.snapshot.data.owners;
    this.races = this.route.snapshot.data.races;
    this.pet = this.route.snapshot.data.pet;
    console.log(this.pet);

    this.petForm = this.fb.group({
      name: [this.pet.name,  Validators.required],
      sex: [this.pet.sex,  Validators.required],
      year: [formatDate(this.pet.year,'MM/yyyy','en'), Validators.required],
      animalId: [this.pet.race.animalId, Validators.required],
      raceId: [this.pet.raceId, Validators.required],
      ownerId: [this.pet.ownerId, Validators.required]
    })

    this.filteredRaces = this.races.filter(r => r.animalId == this.pet.race.animalId);
    console.log(this.filteredRaces);
  
    console.log('forma', this.petForm.value);
    

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
  }

  onEditPet() {
    var body = { ...this.petForm.value, id: this.pet.id }
  
    this.api.update("/api/pets/" + this.pet.id, body)
      .subscribe(
        () => {
        this.router.navigate(['pets']) 
          this._snackBar.open(this.pet.name + ' is edited', 'OK', {
            duration: 5000,
            verticalPosition: this.verticalPosition
          });
        }
      )
  }

  onDeletePetModal(modalPet: Pet) {
    const dailogDeletePet = this.dialogService.open(ModalComponent, {
      data: { user: modalPet }, header: 'Do you want to delete ' + modalPet.name }
    );
    dailogDeletePet.onClose.subscribe(res => {
      console.log(res);
      if (res) {
        this.api.delete("/api/pets/" + this.pet.id)
        .subscribe(() => {
          this.router.navigate(['pets'])
          this._snackBar.open(modalPet.name + ' is deleted', 'End now', {
            duration: 5000,
            verticalPosition: this.verticalPosition
          });
        })
      }
    });
  }

  onCancel() {
    this.router.navigate(['pets'])
  }
}
