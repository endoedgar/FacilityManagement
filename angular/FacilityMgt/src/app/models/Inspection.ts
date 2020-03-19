import { User } from './User';
import { FacilityRedux } from './FacilityRedux';

export class Inspection {
    _id?: string;
    facility: FacilityRedux;
    inspector?: User;
    type: string;
    report: string;
    rating: number;
}