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
    console.dir( "new request ... ");
    
    return this.http.post(`${this.BASE_URL}/facilities/`, { name, type, location });
  }

  public getFacilities(): Observable<any> { 
    return this.http.get(`${this.BASE_URL}/facilities/`);
  }

}
