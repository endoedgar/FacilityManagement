import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class FacilityService {
  private BASE_URL = "http://localhost:4000/api/v1";

  constructor(private http: HttpClient) {}

  getToken(): string {
    return localStorage.getItem("token");
  }

  public addFacility(name: String, type: String, location: number[] ): Observable<any> {
    return this.http.post(`${this.BASE_URL}/facilities/`, { name, type, location });
  }

  public updateFacility(id : String, name: String, type: String, location: number[] ): Observable<any> {
    return this.http.patch(`${this.BASE_URL}/facilities/${id}`, { name, type, location });
  }

  public deleteFacility(id: String): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/facilities/${id}`);
  }

  public getFacilities(): Observable<any> { 
    return this.http.get(`${this.BASE_URL}/facilities/`);
  }

}
