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
    path: "facilities",
    loadChildren: () =>
      import("./modules/facility/facility.module").then(m => m.FacilityModule)
  },
  {
    path: "users",
    loadChildren: () =>
      import("./modules/users/users.module").then(m => m.UsersModule)
  },
  { path: "**", component: DummyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}