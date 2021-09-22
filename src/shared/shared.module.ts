import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { TableModule } from 'primeng/table';
import { MatSelectModule } from '@angular/material/select';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalComponent } from '../app/modal/modal.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MatRadioModule } from '@angular/material/radio';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressBarModule } from 'primeng/progressbar';
import { CardModule } from 'primeng/card';
import { InputTextareaModule } from 'primeng/inputtextarea';



@NgModule({
	declarations: [ModalComponent],
	imports: [
		CommonModule, 
		HttpClientModule,
        ButtonModule,
        InputTextModule,
        FormsModule,
   		ReactiveFormsModule,
        TableModule,
		MatInputModule,
		MatButtonModule,
		MatFormFieldModule,
		MatSelectModule,
		MatSnackBarModule,
		MatDialogModule,
		MatDatepickerModule,
		MatMomentDateModule,
		MatRadioModule,
		RadioButtonModule,
		CalendarModule,
		DropdownModule,
		DynamicDialogModule,
		InputSwitchModule, 
		MessageModule,
		MultiSelectModule,
		ProgressBarModule,
		CardModule,
		InputTextareaModule
	],
	exports: [
		CommonModule, 
		HttpClientModule,
        ButtonModule,
        InputTextModule,
		FormsModule,
		ReactiveFormsModule,
        TableModule,
		MatInputModule,
		MatButtonModule,
		MatFormFieldModule,
		MatSelectModule,
		MatSnackBarModule,
		MatDialogModule,
		MatDatepickerModule,
		MatMomentDateModule,
		MatRadioModule,
		RadioButtonModule,
		CalendarModule,
		DropdownModule,
		DynamicDialogModule,
		InputSwitchModule,
		MessageModule,
		MultiSelectModule,
		ProgressBarModule,
		CardModule,
		InputTextareaModule
	],
	providers: [
		{provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { hasBackdrop: false }},
		{provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true }},
		[DialogService],
		MessageService
	],
	entryComponents: [ModalComponent]
})
export class SharedModule { }