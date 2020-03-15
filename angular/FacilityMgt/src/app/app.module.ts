import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './components/footer/footer.component';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/effects/auth.effects';
import { AuthService } from './services/auth.service';
import { AppComponent } from "./components/app/app.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyMaterialModule } from './modules/material.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FacilityEffects } from './store/effects/facility.effects';
import { reducers } from './store/app.states';
import { DummyComponent } from './components/dummyComponent/dummy.component';
import { FacilityModule } from './modules/facility/facility.module';

@NgModule({
  declarations: [AppComponent, NavbarComponent, DummyComponent, FooterComponent],
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducers, {}), 
    EffectsModule.forRoot([AuthEffects, FacilityEffects]),
    MyMaterialModule,
    RouterModule.forRoot([
      { path: '', component: DummyComponent, pathMatch: 'full' },
      { path: 'login', loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule) },
      { path: 'signup', loadChildren: () => import('./modules/signup/signup.module').then(m => m.SignupModule) },
      { path: 'facilities', loadChildren: () => import('./modules/facility/facility.module').then(m => m.FacilityModule) },
      { path: '**', component: DummyComponent }
    ]), 
    HttpClientModule, BrowserAnimationsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
