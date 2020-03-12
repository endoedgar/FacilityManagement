import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { MatSliderModule } from '@angular/material/slider';
import { AppComponent } from "./app.component";
import { EsriMapComponent } from "./esri-map/esri-map.component";

@NgModule({
  declarations: [AppComponent, EsriMapComponent],
  imports: [BrowserModule, MatSliderModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
