import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MainBodyComponent } from "./main-body/main-body.component";
import { MatSliderModule } from "@angular/material/slider";
import { MatGridListModule } from "@angular/material/grid-list";
import { GeoMapModule } from "../geo-map/geo-map.module";
import { RouterModule } from "@angular/router";
import { StoreModule } from "@ngrx/store";
import { reducers } from "src/app/store/app.states";
import { EffectsModule } from "@ngrx/effects";
import { FacilityEffects } from "src/app/store/effects/facility.effects";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { InputFormComponent } from './input-form/input-form.component';

@NgModule({
  declarations: [MainBodyComponent, InputFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSnackBarModule,
    MatSliderModule,
    MatGridListModule,
    GeoMapModule,
    StoreModule.forFeature("facility", reducers.facility),
    EffectsModule.forFeature([FacilityEffects]),
    RouterModule.forChild([{ path: "", component: MainBodyComponent }])
  ],
  exports: [MainBodyComponent]
})
export class BodyModule {}
