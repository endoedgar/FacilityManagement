import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

import { reducers } from ".";
import { environment } from "src/environments/environment";

import { AuthEffects } from "./effects/auth.effects";
import { UsersEffects } from "./effects/users.effects";
import { InspectionsEffects } from "./effects/inspections.effects";
import { UIEffects } from "./effects/ui.effects";
import { InspectionEffects } from "./effects/inspection.effects";
import { FacilityReduxEffects } from "./effects/facility-redux.effects";

@NgModule({
  imports: [
    StoreModule.forRoot(reducers, {}),
    EffectsModule.forRoot([
      AuthEffects,
      FacilityReduxEffects,
      UsersEffects,
      InspectionsEffects,
      InspectionEffects,
      UIEffects
    ]),
    environment.production ? [] : StoreDevtoolsModule.instrument()
  ],
  exports: [StoreModule]
})
export class StorageModule {}
