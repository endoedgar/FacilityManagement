import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { environment } from '../../environments/environment';

@Injectable({ providedIn: "root" })
export class UsersService {
  constructor(private http: HttpClient) {}

  public patch(username, data): Observable<any> {
    return this.http.patch(`${environment.apiUrl}/users/${username}`, data);
  }

  public find(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/users`);
  }

  public findOne(
    username: String
  ): Observable<any> {
    return this.http.get(`${environment.apiUrl}/users/${username}`);
  }
}
