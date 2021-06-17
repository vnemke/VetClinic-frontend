import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'

import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'
import { FormsModule } from '@angular/forms'
import { TableModule } from 'primeng/table'


@NgModule({
	declarations: [],
	imports: [
		CommonModule, 
		HttpClientModule,
        ButtonModule,
        InputTextModule,
        FormsModule,
        TableModule
	],
	exports: [
		CommonModule, 
		HttpClientModule,
        ButtonModule,
        InputTextModule,
        FormsModule,
        TableModule
	]
})
export class SharedModule { }