import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EsriMapComponent } from './esri-map/esri-map.component';

@NgModule({
  declarations: [EsriMapComponent],
  imports: [
    CommonModule
  ],
  exports: [
    EsriMapComponent
  ]
})
export class GeoMapModule { }
