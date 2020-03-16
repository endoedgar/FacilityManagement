import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class InspectionsService {
  private BASE_URL = "http://localhost:4000/api/v1";

  constructor(private http: HttpClient) {}

  public patch(inspection_id, inspection_data): Observable<any> {
    return this.http.patch(`${this.BASE_URL}/inspections/${inspection_id}`, inspection_data);
  }

  public find(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/inspections`);
  }

  public findOne(
    inspection_id: String
  ): Observable<any> {
    return this.http.get(`${this.BASE_URL}/inspections/${inspection_id}`);
  }
}
