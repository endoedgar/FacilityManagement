import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class AuthService {
  private BASE_URL = "http://localhost:4000/api/v1";

  constructor(private http: HttpClient) {}

  getToken(): string {
    return localStorage.getItem("token");
  }

  public logIn(username: String, password: String): Observable<any> {
    return this.http.post(`${this.BASE_URL}/login`, { username, password });
  }

  public signUp(
    name: String,
    username: String,
    password: String
  ): Observable<any> {
    return this.http.post(`${this.BASE_URL}/users`, {
      name,
      username,
      password
    });
  }
}
