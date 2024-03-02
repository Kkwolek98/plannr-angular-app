import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { envConfig } from "../app.config";
import { LoginResponse } from "../types/auth/login";
import { User } from "../types/user/user";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  readonly http = inject(HttpClient);

  public login$(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(envConfig.url + "/login", { email, password });
  }

  public register$(email: string, password: string): Observable<User> {
    return this.http.post<User>(envConfig.url + "/register", { email, password });
  }
}
