import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DummyComponent } from "./components/dummyComponent/dummy.component";

const routes: Routes = [
  { path: "", component: DummyComponent, pathMatch: "full" },
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
  {
    path: "inspections",
    loadChildren: () =>
      import("./modules/inspections/inspections.module").then(m => m.InspectionsModule)
  },
  { path: "**", component: DummyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
