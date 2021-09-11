import { formatDate } from '@angular/common';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { ApiService } from 'src/app/api.service';
import { ModalComponent } from 'src/app/modal/modal.component';
import { PetService } from 'src/app/pet-services/pet-service';
import { Pet } from 'src/app/pets/pet';
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

  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  
  constructor(private fb: FormBuilder, private api: ApiService, private route: ActivatedRoute, 
    public router: Router, public dialogService: DialogService, private _snackBar: MatSnackBar,
    private http: HttpClient) { }

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
      diagnosis: [this.case.diagnosis, Validators.required],
      date: [formatDate(this.case.date, 'dd/MM/y','en'), Validators.required],
      vetCases: [this.selectedVets, Validators.required],
      casePetServices: [this.seletedServices, Validators.required],
      therapies: this.fb.array([]),
      controls: this.fb.array([])
      // xrays: this.case.xrays
    }); 

    //therapies form array
    this.case.therapies.forEach((t: any) => {
      const therapyFormGroup = this.fb.group({
        drug: [t.drug, Validators.required],
        description: t.description,
        date: formatDate(t.date, 'dd/MM/y','en')
      });
      this.therapiesForm.push(therapyFormGroup);
    });

    //controls form array
    this.case.controls.forEach((c: any) => {
      const controlFormGroup = this.fb.group({
        name: [c.name],
        description: [c.description],
        date: [c.date]
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
      drug: [],
      description: [],
      date: [],
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
      name: [],
      description: [],
      date: []
    });
    this.controlsForm.push(controlFormGroup);
  }

  deleteControl(controlIndex: number) {
    this.controlsForm.removeAt(controlIndex);
  }

  //uploder
  // selectedFile: File;

  // onFileSelected(event: any) {
  //   this.selectedFile = <File>event.target.files[0];
  // }

  // onUpload() {
  //   const fd = new FormData();
  //   fd.append('files', this.selectedFile, this.selectedFile.name);

  //   this.http.post("/api/xrays/upload", fd, {
  //     reportProgress: true,
  //     observe: 'events'
  //   })
  //   .subscribe(event => {
  //     if (event.type === HttpEventType.UploadProgress) {
  //       const total: any = event.total
  //       console.log('Upload Prograss: '+ Math.round(event.loaded / total * 100) + '%');
        
  //     } else if(event.type === HttpEventType.Response) {
  //       console.log(event);
  //     }
  //     console.log(event);
  //   })
  // }
 
  onEditCase() {
    var body = { ...this.caseForm.value, id: this.case.id }
    body.vetCases = body.vetCases.map((vetIdArg: any) => {
      return {vetId: vetIdArg}
    })
    body.casePetServices = body.casePetServices.map((ServiceIdArg: any) => {
      return {petServiceId: ServiceIdArg}
    })
    console.log('editval',body);
    this.api.update("/api/cases/" + this.case.id, body)
      .subscribe(
        () => {
          this.router.navigate(['cases']) 
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
          this.router.navigate(['cases'])
          this._snackBar.open(modalCase.name + ' is deleted', 'End now', {
            duration: 5000,
            verticalPosition: this.verticalPosition
          });
        })
      }
    })
  }

  onCancel() {
    this.router.navigate(['cases'])
  }

}
