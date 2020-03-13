import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { MatSliderModule } from '@angular/material/slider';
import { AppComponent } from "./app.component";
import { GeoMapModule } from "./geo-map/geo-map.module";

import { AppRoutingModule, routingComponents } from "./app-routing.module";


@NgModule({
  declarations: [AppComponent, routingComponents],
  imports: [ BrowserModule, MatSliderModule, GeoMapModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
