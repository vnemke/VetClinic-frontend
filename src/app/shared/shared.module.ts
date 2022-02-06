import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';

//modal
import { ModalComponent } from '../modal/modal.component';

//progressbar
import { NgProgressModule } from 'ngx-progressbar';
import { NgProgressHttpModule } from 'ngx-progressbar/http';

//primeNG
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PasswordModule } from 'primeng/password';


//angualar materials
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from "@angular/material/button";

const sharedExports = [
    HttpClientModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    MatSnackBarModule,
    RadioButtonModule,
    CalendarModule,
    DropdownModule,
    DynamicDialogModule,
    InputSwitchModule,
    MultiSelectModule,
    InputTextareaModule,
    MatIconModule,
    MatMenuModule,
    NgProgressModule,
    MatButtonModule,
    PasswordModule
];

@NgModule({
    declarations: [ModalComponent],
    imports: [CommonModule,
        NgProgressModule.withConfig({
            spinner: false,
            color: '#3d8aca'
        }),
        NgProgressHttpModule.withConfig({
            silentApis: ['/api/xrays/upload']
        }),
        ...sharedExports
    ],
    exports: [CommonModule, NgProgressModule, NgProgressHttpModule, ...sharedExports],
    providers: [
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
        JwtHelperService,
        [DialogService]
    ],
    entryComponents: [ModalComponent]
})
export class SharedModule { }