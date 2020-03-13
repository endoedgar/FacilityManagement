import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";

import { AppRoutingModule, routingComponents } from "./app-routing.module";
import { BodyModule } from './body/body.module';


@NgModule({
  declarations: [AppComponent, routingComponents],
  imports: [BrowserModule, AppRoutingModule, BodyModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
