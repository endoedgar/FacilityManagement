import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";

import { AppRoutingModule, routingComponents } from "./app-routing.module";
import { BodyModule } from './body/body.module';
import { FooterModule } from './footer/footer.module';
import { HeaderModule } from './header/header.module';


@NgModule({
  declarations: [AppComponent, routingComponents],
  imports: [BrowserModule, AppRoutingModule, BodyModule, HeaderModule, FooterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
