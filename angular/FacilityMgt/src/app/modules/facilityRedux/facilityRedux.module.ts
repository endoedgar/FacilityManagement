import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { StoreModule } from "@ngrx/store";
import { reducers } from "src/app/store";
import { EffectsModule } from "@ngrx/effects";
import { FacilityReduxEffects } from "src/app/store/effects/facility-redux.effects";
import { AddFacilityReduxComponent } from "./add-facility/add-facility.component";
import { BodyReduxComponent } from "./body/body.component";
import { MyMaterialModule } from "../material.module";
import { EsriMapComponent } from "./esri-map/esri-map.component";
import { ConfirmDialogComponent } from "./confirm-dialog/confirm-dialog.component";
import { IdToDatePipe } from 'src/app/pipes/id-to-date.pipe';
@NgModule({
  declarations: [
    AddFacilityReduxComponent,
    BodyReduxComponent,
    EsriMapComponent,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature("facilityRedux", reducers.facilityRedux),
    EffectsModule.forFeature([FacilityReduxEffects]),
    RouterModule.forChild([{ path: "", component: BodyReduxComponent }]),
    FormsModule,
    ReactiveFormsModule,
    MyMaterialModule
  ],
  providers: [ IdToDatePipe ]
})
export class FacilityReduxModule {}
