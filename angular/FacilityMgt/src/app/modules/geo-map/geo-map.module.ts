import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EsriMapComponent } from './esri-map/esri-map.component';
import { MyMaterialModule } from '../material.module';
import { ConfirmDialogComponent } from './esri-map/confirm-dialog/confirm-dialog.component';
import { MapStateService } from 'src/app/services/map-state.service';

@NgModule({
  declarations: [EsriMapComponent, ConfirmDialogComponent],
  imports: [
    CommonModule, MyMaterialModule
  ],
  exports: [
    EsriMapComponent
  ],
  bootstrap: [EsriMapComponent],
  providers:[],
  entryComponents:[ConfirmDialogComponent]
})
export class GeoMapModule { }
