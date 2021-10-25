import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JwtHelperService } from '@auth0/angular-jwt';
import { LayoutModule } from '@angular/cdk/layout';

import { NgProgressModule } from 'ngx-progressbar';
import { NgProgressHttpModule } from 'ngx-progressbar/http';

import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from "@angular/material/select";
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';


import { FormControl, FormGroupDirective, NgForm, ReactiveFormsModule } from "@angular/forms";
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { ErrorStateMatcher } from '@angular/material/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

const sharedExports = [
  ReactiveFormsModule,
  MatInputModule,
  MatSelectModule,
  MatButtonModule,
  MatIconModule,
  MatRadioModule,
  MatCheckboxModule,
  MatDividerModule,
  MatMenuModule,
  LayoutModule,
  MatProgressSpinnerModule,
  MatSnackBarModule
];

class ShowOnValueErrorStateMatcher implements ErrorStateMatcher {
  constructor() {
  }
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.value && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@NgModule({
  imports: [CommonModule,
    NgProgressModule.withConfig({
      spinner: false,
      color: '#0E3D54'
    }),
    NgProgressHttpModule.withConfig({
      silentApis: ['/api/upload']
    }),
    ...sharedExports
  ],
  declarations: [],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill', hideRequiredMarker: false }
    },
    { provide: ErrorStateMatcher, useClass: ShowOnValueErrorStateMatcher },
    JwtHelperService
  ],
  exports: [CommonModule, NgProgressModule, NgProgressHttpModule, ...sharedExports]
})

export class SharedModule {
  constructor(
    private _domSanitizer: DomSanitizer,
    private _matIconRegistry: MatIconRegistry
  ) {
    this._matIconRegistry.addSvgIconSetInNamespace('heroicons_outline', this._domSanitizer.bypassSecurityTrustResourceUrl('../../assets/icons/heroicons-outline.svg'));
  }

}


