import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { environment } from '../../environments/environment';

@Injectable({ providedIn: "root" })
export class FacilityService {
  constructor(private http: HttpClient) {}

  public addFacility(name: String, type: String, location: number[] ): Observable<any> {
    return this.http.post(`${environment.apiUrl}/facilities/`, { name, type, location });
  }

  public updateFacility(id : String, name: String, type: String, location: number[] ): Observable<any> {
    return this.http.patch(`${environment.apiUrl}/facilities/${id}`, { name, type, location });
  }

  public deleteFacility(id: String): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/facilities/${id}`);
  }

  public getFacilities(): Observable<any> { 
    return this.http.get(`${environment.apiUrl}/facilities/`);
  }

}
