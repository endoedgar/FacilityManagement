import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserSettingsComponent } from "./user-settings/user-settings.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatSnackBarModule } from "@angular/material/snack-bar";

import { RouterModule, Routes } from "@angular/router";
import { reducers } from "../../store";
import { EffectsModule } from "@ngrx/effects";
import { AuthEffects } from "../../store/effects/auth.effects";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ApplicationPipesModule } from '../pipes.module';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

const MY_ROUTES: Routes = [{ path: "", component: UserSettingsComponent }];

@NgModule({
  declarations: [UserSettingsComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature("auth", reducers.auth),
    EffectsModule.forFeature([AuthEffects]),
    RouterModule.forChild(MY_ROUTES),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    ApplicationPipesModule,
    MatChipsModule,
    MatIconModule
  ]
})
export class SettingsModule {}
