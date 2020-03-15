import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLoginComponent } from './user-login/user-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatSnackBarModule } from "@angular/material/snack-bar";

import { RouterModule, Routes } from '@angular/router';
import { reducers } from '../../store/app.states';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from '../../store/effects/auth.effects';

@NgModule({
  declarations: [UserLoginComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature('auth', reducers.auth ),
    EffectsModule.forFeature([AuthEffects]),
    RouterModule.forChild([
      {path: '', component: UserLoginComponent}
    ]),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSnackBarModule
  ]
})
export class LoginModule { }
