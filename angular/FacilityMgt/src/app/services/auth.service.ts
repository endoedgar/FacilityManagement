import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class AuthService {
  private BASE_URL = "http://localhost:4000/api/v1";

  constructor(private http: HttpClient) {}

  public setToken(token : string): void {
    if(token)
      localStorage.setItem("token", token);
    else
      localStorage.removeItem("token");
  }

  public getUserDataFromJWT(token : string) {
    return token
      ?.split(".")
      .slice(0, 2)
      .map(e => JSON.parse(atob(e)))[1];
  }

  public getToken(): string {
    return localStorage.getItem("token");
  }

  public logIn(username: String, password: String): Observable<any> {
    return this.http.post(`${this.BASE_URL}/login`, { username, password });
  }

  public signUp(
    name: String,
    username: String,
    password: String,
    email: String
  ): Observable<any> {
    return this.http.post(`${this.BASE_URL}/users`, {
      name,
      username,
      password,
      email,
      groups: [ "User", "Newbie" ]
    });
  }
}
