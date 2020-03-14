import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainBodyComponent } from './main-body/main-body.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatGridListModule } from '@angular/material/grid-list';
import { GeoMapModule } from "../geo-map/geo-map.module";
import { FormModule } from '../form/form.module';


@NgModule({
  declarations: [MainBodyComponent],
  imports: [
    CommonModule, MatSliderModule, MatGridListModule, GeoMapModule, FormModule
  ],
  exports: [MainBodyComponent]
})
export class BodyModule { }
