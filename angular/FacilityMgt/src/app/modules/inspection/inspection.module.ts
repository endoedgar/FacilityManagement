import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ViewInspectionsComponent } from './view-inspections/view-inspections.component';
import { InspectionDetailsComponent } from './inspection-details/inspection-details.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { ApplicationPipesModule } from '../pipes.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';


const MY_ROUTES: Routes = [
  { path: '', component: ViewInspectionsComponent },
];

@NgModule({
  declarations: [ViewInspectionsComponent, InspectionDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(MY_ROUTES),
    FormsModule,
    ApplicationPipesModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSnackBarModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule
  ]
})

export class InspectionModule { }
