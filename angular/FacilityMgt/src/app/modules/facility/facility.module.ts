import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { StoreModule } from "@ngrx/store";
import { reducers } from "src/app/store/states/app.states";
import { EffectsModule } from "@ngrx/effects";
import { FacilityEffects } from "src/app/store/effects/facility.effects";
import { AddFacilityComponent } from "./add-facility/add-facility.component";
import { BodyComponent } from "./body/body.component";
import { MyMaterialModule } from "../material.module";
import { GeoMapModule } from '../geo-map/geo-map.module';
@NgModule({
  declarations: [AddFacilityComponent, BodyComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature("facility", reducers.facility),
    EffectsModule.forFeature([FacilityEffects]),
    RouterModule.forChild([{ path: "", component: BodyComponent }]),
    FormsModule,
    ReactiveFormsModule,
    MyMaterialModule,
    GeoMapModule
  ],
  exports: [AddFacilityComponent]
})
export class FacilityModule {}
