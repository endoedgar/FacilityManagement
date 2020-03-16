import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InspectionService {

  private BASE_URL = "http://localhost:4000/api/v1";

  constructor(private http: HttpClient) { }

  public getInspections(): Observable<any> {
    console.dir("get request ... ");
    return this.http.get(`${this.BASE_URL}/inspections/`);
  }

  public getInspection(inspectionId: string): Observable<any> {
    console.dir("get request ... ");
    return this.http.get(`${this.BASE_URL}/inspections/${inspectionId}`);
  }

  public getFacilityInspections(facility_Id: string): Observable<any> {
    console.dir("get request ... ");
    return this.http.get(`${this.BASE_URL}/inspections/facility/${facility_Id}`);
  }

  public addInspection(inspection: { inspector_id: string, facility_Id: string, type: string, report: string, rating: Number }): Observable<any> {
    console.dir("post request ... ");
    return this.http.post(`${this.BASE_URL}/inspections/`, inspection);
  }

  public editInspection(inspection_id: string, inspection: { inspector_id?: string, facility_Id?: string, type?: string, report?: string, rating?: Number }): Observable<any> {
    console.dir("patch request ... ");
    return this.http.patch(`${this.BASE_URL}/inspections/${inspection_id}`, inspection);
  }
  
  public deleteInspection(inspection_id: string): Observable<any> {
    console.dir("delete request ... ");
    return this.http.delete(`${this.BASE_URL}/inspections/${inspection_id}`);
  }

}
