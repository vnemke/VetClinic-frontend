import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { ApiService } from '@vetclinic-app/api.service';
import { ModalComponent } from '@vetclinic-app/modal/modal.component';
import { PetService } from '@vetclinic-app/pet-services/pet-service';
import { Pet } from '@vetclinic-app/pets/pet';
import { Case } from '../case';
import { Control } from '../control';
import { Therapy } from '../therapy';
import { Vet } from '../vet';
import { Xray } from '../xray';


@Component({
  selector: 'app-edit-case',
  templateUrl: './edit-case.component.html',
  styleUrls: ['./edit-case.component.scss']
})
export class EditCaseComponent implements OnInit {
  caseForm: FormGroup;
  therapyFormGroup: FormGroup;
  case: Case;
  pets: Pet[];
  therapies: Therapy[];
  controls: Control[];
  xrays: Xray[];
  vets: Vet[];
  petServices: PetService[];
  selectedVets: any[] = [];
  seletedServices: any[] = [];
  selectedTherapies: any[] = [];
  selectedControls: any[] = [];
  // dateFormat: any ="dd/mm/yy"

  @ViewChild('fileUploader') fileUploader: any;

  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  
  constructor(private fb: FormBuilder, private api: ApiService, private route: ActivatedRoute, 
    public router: Router, public dialogService: DialogService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.case = this.route.snapshot.data.case;
    this.pets = this.route.snapshot.data.pets;
    this.therapies = this.route.snapshot.data.therapies;
    this.controls = this.route.snapshot.data.controls;
    this.xrays = this.route.snapshot.data.xrays;
    this.vets = this.route.snapshot.data.vets;
    this.petServices = this.route.snapshot.data.petServices;

    console.log(this.route.snapshot.data);
  
    this.selectedVets = this.case.vetCases.map((v: any) => v.vetId);
    console.log('mappedvets',this.selectedVets);
    
    this.seletedServices = this.case.casePetServices.map((s: any) => s.petServiceId);
    console.log('mappedservices', this.seletedServices);

    this.caseForm = this.fb.group({
      name: [this.case.name, Validators.required],
      petId: [this.case.petId, Validators.required],
      diagnosis: [this.case.diagnosis],
      date: formatDate(this.case.date,'dd/MM/y','en'),
      // date: [{value:formatDate(this.case.date,'dd/MM/y','en'), disabled: true}],
      vetCases: [this.selectedVets, Validators.required],
      casePetServices: [this.seletedServices, Validators.required],
      therapies: this.fb.array([]),
      controls: this.fb.array([]),
    }); 


    //therapies form array
    this.case.therapies.forEach((t: any) => {
      const therapyFormGroup = this.fb.group({
        drug: [t.drug, Validators.required],
        description: t.description,
        date: [formatDate(t.date, 'dd/MM/y','en'), Validators.required]
      });
      this.therapiesForm.push(therapyFormGroup);
    });

    //controls form array
    this.case.controls.forEach((c: any) => {
      const controlFormGroup = this.fb.group({
        name: [c.name, Validators.required],
        description: c.description,
        date: [formatDate(c.date, 'dd/MM/y','en'), Validators.required]
      });
      this.controlsForm.push(controlFormGroup)
    });

    console.log('caseform',this.caseForm.value);
  }

  //therapies form array
  get therapiesForm() {
    return this.caseForm.controls["therapies"] as FormArray;
  }

  addTherapiesForm() {
    const therapyFormGroup = this.fb.group({
      drug: ['', Validators.required],
      description: [],
      date: ['', Validators.required]
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
      description: [],
      date: ['', Validators.required]
    });
    this.controlsForm.push(controlFormGroup);
  }

  deleteControl(controlIndex: number) {
    this.controlsForm.removeAt(controlIndex);
  }
 
  onEditCase() {
    var body = { ...this.caseForm.value, id: this.case.id, xrays: this.fileUploader.getUploaded() }
    body.vetCases = body.vetCases.map((vetIdArg: any) => {
      return {vetId: vetIdArg}
    })
    body.casePetServices = body.casePetServices.map((ServiceIdArg: any) => {
      return {petServiceId: ServiceIdArg}
    })
    this.api.update("/api/cases/" + this.case.id, body)
    .subscribe(
      () => {
        console.log('editbody',body);
        this.router.navigate(['/app/cases']) 
        this._snackBar.open(this.case.name + ' is edited', 'OK', {
          duration: 5000,
          verticalPosition: this.verticalPosition
        });
      }
    )
  }

  onDeleteCaseModal(modalCase: Case) {
    const dialogDeleteCase = this.dialogService.open(ModalComponent, {
      data: { case: modalCase }, header: 'Do you want to delete ' + modalCase.name }
    );
    dialogDeleteCase.onClose.subscribe(res => {
      if (res) {
        this.api.delete("/api/cases/" + this.case.id)
        .subscribe(() => {
          this.router.navigate(['/app/cases'])
          this._snackBar.open(modalCase.name + ' is deleted', 'OK', {
            duration: 5000,
            verticalPosition: this.verticalPosition
          });
        })
      }
    })
  }
  
  onCancel() {
    this.router.navigate(['/app/cases'])
  }

}
