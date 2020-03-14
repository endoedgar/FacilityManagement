import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { UserLoginComponent } from './login/user-login/user-login.component';
import { AppComponent } from './app.component';
import { MainBodyComponent } from './body/main-body/main-body.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: AppComponent },
  { path: 'login', component: UserLoginComponent },
  { path: 'inspection', component: MainBodyComponent },
  { path: '**', component: AppComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private router: Router) {
    // this.router.errorHandler = (error: any) => {
    //     this.router.navigate(['404']); // or redirect to default route
    // }
  }
}
export const routingComponents = [UserLoginComponent] 