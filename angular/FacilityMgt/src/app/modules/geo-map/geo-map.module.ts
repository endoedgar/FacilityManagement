import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EsriMapComponent } from './esri-map/esri-map.component';
<<<<<<< Updated upstream
import { MyMaterialModule } from '../material.module';
import { ConfirmDialogComponent } from './esri-map/confirm-dialog/confirm-dialog.component';
import { MapStateService } from 'src/app/services/map-state.service';
=======
import { MatCardModule } from "@angular/material/card";
import { MyMaterialModule } from '../material.module';
>>>>>>> Stashed changes

@NgModule({
  declarations: [EsriMapComponent, ConfirmDialogComponent],
  imports: [
<<<<<<< Updated upstream
    CommonModule, MyMaterialModule
=======
    CommonModule,MatCardModule, MyMaterialModule
>>>>>>> Stashed changes
  ],
  exports: [
    EsriMapComponent
  ],
  bootstrap: [EsriMapComponent],
  providers:[],
  entryComponents:[ConfirmDialogComponent]
})
export class GeoMapModule { }
