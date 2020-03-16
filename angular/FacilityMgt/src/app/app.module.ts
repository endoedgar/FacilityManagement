import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './components/footer/footer.component';
import { AuthService } from './services/auth.service';
import { AppComponent } from "./components/app/app.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyMaterialModule } from './modules/material.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DummyComponent } from './components/dummyComponent/dummy.component';
import { httpInterceptProviders } from './http-interceptors';
import { ApplicationPipesModule } from './modules/pipes.module';
import { StorageModule } from './store/storage.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent, NavbarComponent, DummyComponent, FooterComponent],
  imports: [
    BrowserModule,
    StorageModule,
    MyMaterialModule,
    ApplicationPipesModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [AuthService, httpInterceptProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
