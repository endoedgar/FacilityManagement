import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputFormComponent } from './input-form/input-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { Routes, RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { reducers } from 'src/app/store/app.states';
import { EffectsModule } from '@ngrx/effects';
import { FacilityEffects } from 'src/app/store/effects/facility.effects';

const MY_ROUTES : Routes = [
  {path: '', component: InputFormComponent}
];

@NgModule({
  declarations: [InputFormComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature('facility', reducers.facility),
    EffectsModule.forFeature([FacilityEffects]),
    RouterModule.forChild(MY_ROUTES),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSnackBarModule
  ],
  exports:[
    InputFormComponent,
  ]
})
export class FormModule { }
