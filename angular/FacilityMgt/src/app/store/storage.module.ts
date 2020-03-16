import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from '.';
import { AuthEffects } from './effects/auth.effects';
import { FacilityEffects } from './effects/facility.effects';
import { UsersEffects } from './effects/users.effects';
import { UIEffects } from './effects/ui.effects';
import { environment } from 'src/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
    imports: [
        StoreModule.forRoot(reducers, {}), 
        EffectsModule.forRoot([AuthEffects, FacilityEffects, UsersEffects, UIEffects]),
        environment.production ? [] : StoreDevtoolsModule.instrument()
    ],
    exports: [
        StoreModule
    ]
})
export class StorageModule {}