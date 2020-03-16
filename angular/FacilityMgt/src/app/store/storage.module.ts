import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from '.';
import { AuthEffects } from './effects/auth.effects';
import { FacilityEffects } from './effects/facility.effects';
import { UsersEffects } from './effects/users.effects';
import { UIEffects } from './effects/ui.effects';

@NgModule({
    imports: [
        StoreModule.forRoot(reducers, {}), 
        EffectsModule.forRoot([AuthEffects, FacilityEffects, UsersEffects, UIEffects])
    ],
    exports: [
        StoreModule
    ]
})
export class StorageModule {}