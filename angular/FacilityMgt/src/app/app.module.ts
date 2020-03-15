import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { BodyModule } from './components/body/body.module';
import { FooterModule } from './components/footer/footer.module';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/effects/auth.effects';
import { AuthService } from './services/auth.service';
import { MainBodyComponent } from './components/body/main-body/main-body.component';
import { AppComponent } from "./components/app/app.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyMaterialModule } from './modules/material.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FacilityEffects } from './store/effects/facility.effects';

@NgModule({
  declarations: [AppComponent, NavbarComponent],
  imports: [
    BrowserModule, 
    BodyModule,
    FooterModule,
    StoreModule.forRoot({}), 
    EffectsModule.forRoot([AuthEffects, FacilityEffects]),
    MyMaterialModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: AppComponent },
      { path: 'login', loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule) },
      { path: 'signup', loadChildren: () => import('./modules/signup/signup.module').then(m => m.SignupModule) },
      { path: 'inspection', component: MainBodyComponent },
      { path: '**', component: AppComponent }
    ]), 
    HttpClientModule, BrowserAnimationsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
