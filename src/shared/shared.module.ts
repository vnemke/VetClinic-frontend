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
		MatSelectModule
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
		MatSelectModule
	]
})
export class SharedModule { }