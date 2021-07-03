import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { TableModule } from 'primeng/table';
import { MatSelectModule } from '@angular/material/select';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
	declarations: [],
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
	],
	providers: [{provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}]
})
export class SharedModule { }