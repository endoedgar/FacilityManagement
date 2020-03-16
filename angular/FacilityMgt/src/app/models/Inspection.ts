import { Facility } from './Facility';
import { User } from './User';

export class Inspection {
    _id?: string;
    facility: Facility;
    inspector: User;
    type: string;
    report: string;
    rating: number;
}