import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '@vetclinic-app/core/services/api.service';
import { PetService } from '../pet-service';

@Component({
  selector: 'app-new-pet-service',
  templateUrl: './new-pet-service.component.html',
  styleUrls: ['./new-pet-service.component.scss']
})
export class NewPetServiceComponent implements OnInit {

  petServiceForm: FormGroup;
  petServices: PetService[] = [];
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private fb: FormBuilder, private api: ApiService, public route: ActivatedRoute,
    public router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.petServices = this.route.snapshot.data.petServices;
    console.log(this.petServices);

    this.petServiceForm  = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ''
    });
  }


  onAddService() {
    this.api.post("/api/petservices", this.petServiceForm.value)
    .subscribe(
      () => {
        this.router.navigate(['/app/pet-services'])
        this._snackBar.open('pet service is added', 'OK', {
          duration: 5000,
          verticalPosition: this.verticalPosition
        });
      }
    )
  }

  onCancel() {
    this.router.navigate(['/app/pet-services'])
  }
}
