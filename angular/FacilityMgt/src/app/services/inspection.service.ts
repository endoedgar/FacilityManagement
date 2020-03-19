import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Inspection } from '../models/Inspection';

@Injectable({
  providedIn: 'root'
})
export class InspectionService {
  constructor(private http: HttpClient) { }

  public getInspections(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/inspections/`);
  }

  public getInspection(inspectionId: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/inspections/${inspectionId}`);
  }

  public getFacilityInspections(facility_Id: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/inspections/facility/${facility_Id}`);
  }

  public createInspection(inspection: Inspection): Observable<any> {
    return this.http.post(`${environment.apiUrl}/inspections/`, inspection);
  }

  public updateInspection(inspection: Inspection): Observable<any> {
    return this.http.patch(`${environment.apiUrl}/inspections/${inspection._id}`, inspection);
  }

  public deleteInspection(inspection_id: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/inspections/${inspection_id}`);
  }

}
