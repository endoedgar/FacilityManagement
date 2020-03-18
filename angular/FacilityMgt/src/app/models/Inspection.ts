import { User } from './User';
import { FacilityRedux } from './FacilityRedux';

export class Inspection {
    _id?: string;
    facility?: string | FacilityRedux;
    inspector?: User | string;
    type: string;
    report: string;
    rating: number;
}