import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, tap } from "rxjs";
import { envConfig } from "../app.config";
import { LoginResponse } from "../types/auth/login";
import { User } from "../types/user/user";
import { JwtService } from "./jwt.service";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  private readonly http = inject(HttpClient);
  private readonly jwtService = inject(JwtService);
  private readonly router = inject(Router);

  public login$(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(envConfig.url + "/auth/login", { email, password }).pipe(
      tap((res) => {
        this.jwtService.initToken(res.token);
        this.router.navigate(["/exercises"]);
      })
    );
  }

  public register$(email: string, password: string): Observable<User> {
    return this.http.post<User>(envConfig.url + "/auth/register", { email, password });
  }
}
