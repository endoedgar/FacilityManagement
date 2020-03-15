import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class UsersService {
  private BASE_URL = "http://localhost:4000/api/v1";

  constructor(private http: HttpClient) {}

  public find(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/users`);
  }

  public findOne(
    username: String
  ): Observable<any> {
    return this.http.get(`${this.BASE_URL}/users/${username}`);
  }
}
