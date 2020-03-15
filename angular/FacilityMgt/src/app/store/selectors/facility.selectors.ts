import { createFeatureSelector } from '@ngrx/store';
import { FacilityState } from '../states/facility.state';

export const selectFacilityState = createFeatureSelector<FacilityState>("facility");