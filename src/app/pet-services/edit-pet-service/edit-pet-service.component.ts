import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { ApiService } from '@vetclinic-app/api.service';
import { ModalComponent } from '@vetclinic-app/modal/modal.component';
import { PetService } from '../pet-service';

@Component({
  selector: 'app-edit-pet-service',
  templateUrl: './edit-pet-service.component.html',
  styleUrls: ['./edit-pet-service.component.scss']
})
export class EditPetServiceComponent implements OnInit {
  petServiceForm: FormGroup;
  petService: PetService;
  petServices: PetService[] = [];
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private fb: FormBuilder, private api: ApiService, public route: ActivatedRoute,
    public router: Router, public dialogService: DialogService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.petService = this.route.snapshot.data.petService;
    this.petServices = this.route.snapshot.data.petServices;
    console.log(this.petService);

    this.petServiceForm  = this.fb.group({
      name: [this.petService.name, Validators.required],
      price: [this.petService.price, Validators.required],
      description: this.petService.description
    });
  }

  onEditService() {
    var body = {...this.petServiceForm.value, id: this.petService.id }

    this.api.update("/api/petservices/" + this.petService.id, body)
      .subscribe(
        () => {
        this.router.navigate(['/app/pet-services']) 
          this._snackBar.open(this.petService.name + ' is edited', 'OK', {
            duration: 5000,
            verticalPosition: this.verticalPosition
          });
        }
      )
  }

  onDeleteServiceModal(modalPetService: PetService) {
    const dailogDeletePet = this.dialogService.open(ModalComponent, {
      data: { modalPetService }, header: 'Do you want to delete ' + modalPetService.name }
    );
    dailogDeletePet.onClose.subscribe(res => {
      console.log(res);
      if (res) {
        this.api.delete("/api/petservices/" + this.petService.id)
        .subscribe(() => {
          this.router.navigate(['/app/pet-services'])
          this._snackBar.open(modalPetService.name + ' is deleted', 'OK', {
            duration: 5000,
            verticalPosition: this.verticalPosition
          });
        })
      }
    });
  }

  onCancel() {
    this.router.navigate(['/app/pet-services'])
  }
}
