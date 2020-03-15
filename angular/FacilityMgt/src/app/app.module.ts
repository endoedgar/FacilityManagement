import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/effects/auth.effects';
import { AuthService } from './services/auth.service';
import { AppComponent } from "./components/app/app.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyMaterialModule } from './modules/material.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FacilityEffects } from './store/effects/facility.effects';
import { FooterComponent } from './components/footer/footer.component';
import { BodyComponent } from './components/body/body.component';
import { FacilityModule } from './modules/facility/facility.module';
import { GeoMapModule } from './modules/geo-map/geo-map.module';


@NgModule({
  declarations: [AppComponent, NavbarComponent, FooterComponent, BodyComponent],
  imports: [
    BrowserModule,
    StoreModule.forRoot({}), 
    EffectsModule.forRoot([AuthEffects, FacilityEffects]),
    MyMaterialModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: AppComponent },
      { path: 'login', loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule) },
      { path: 'signup', loadChildren: () => import('./modules/signup/signup.module').then(m => m.SignupModule) },
      { path: 'facility', loadChildren: () => import('./modules/facility/facility.module').then(m => m.FacilityModule) },
      { path: '**', component: AppComponent }
    ]), 
    HttpClientModule, BrowserAnimationsModule, FacilityModule, GeoMapModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
