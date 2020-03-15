import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EsriMapComponent } from './esri-map/esri-map.component';
import { MatCardModule } from "@angular/material/card";

@NgModule({
  declarations: [EsriMapComponent],
  imports: [
    CommonModule,MatCardModule
  ],
  exports: [
    EsriMapComponent
  ]
})
export class GeoMapModule { }
