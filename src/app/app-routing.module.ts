import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ErrorComponent } from "./components/error/error.component";
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: "", component: HomeComponent, pathMatch: "full" },
  {
    path: "login",
    loadChildren: () =>
      import("./modules/login/login.module").then(m => m.LoginModule)
  },
  {
    path: "signup",
    loadChildren: () =>
      import("./modules/signup/signup.module").then(m => m.SignupModule)
  },
  {
    path: "settings",
    loadChildren: () =>
      import("./modules/settings/settings.module").then(m => m.SettingsModule)
  },
  {
    path: "facilities",
    loadChildren: () =>
      import("./modules/facilityRedux/facilityRedux.module").then(m => m.FacilityReduxModule)
  },
  {
    path: "inspection",
    loadChildren: () =>
      import("./modules/inspection/inspection.module").then(m => m.InspectionModule)
  },
  {
    path: "users",
    loadChildren: () =>
      import("./modules/users/users.module").then(m => m.UsersModule)
  },
  { path: "**", component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
