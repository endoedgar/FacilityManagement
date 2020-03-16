import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from '.';
import { AuthEffects } from './effects/auth.effects';
import { FacilityEffects } from './effects/facility.effects';
import { UsersEffects } from './effects/users.effects';

@NgModule({
    imports: [
        StoreModule.forRoot(reducers, {}), 
        EffectsModule.forRoot([AuthEffects, FacilityEffects, UsersEffects])
    ],
    exports: [
        StoreModule
    ]
})
export class StorageModule {}