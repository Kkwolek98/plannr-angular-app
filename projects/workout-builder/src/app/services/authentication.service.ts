import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, Subscription, catchError, tap } from "rxjs";
import { envConfig } from "../../../../../envConfig";
import { NotificationsService } from "../../../../shared/src/lib/notifications/services/notifications.service";
import { LoginResponse } from "../../../../shared/src/lib/types/auth/login";
import { User } from "../../../../shared/src/lib/types/user/user";
import { InactivityService } from "./inactivity.service";
import { JwtService } from "./jwt.service";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  private readonly http = inject(HttpClient);
  private readonly jwtService = inject(JwtService);
  private readonly router = inject(Router);
  private readonly inactivityService = inject(InactivityService);
  private readonly notificationsService = inject(NotificationsService);
  private logoutSub$?: Subscription;

  public login$(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(envConfig.url + "/auth/login", { email, password }).pipe(
      tap((res) => {
        this.jwtService.initToken(res.token);
        this.router.navigate(["/exercises"]);
        this.inactivityService.startListening(res.token);
        this.waitForLogout();
      }),
      catchError((err: HttpErrorResponse) => {
        this.notificationsService.open({
          type: "error",
          message: err.error.message || err.message,
        });

        throw err;
      })
    );
  }

  public register$(email: string, password: string): Observable<User> {
    return this.http.post<User>(envConfig.url + "/auth/register", { email, password }).pipe(
      tap((res) => {
        if (res) {
          this.router.navigate(["/login"]);
        }
      })
    );
  }

  public logout(): void {
    this.router.navigate(["/login"]);
    this.jwtService.clearToken();
  }

  public waitForLogout(): void {
    if (this.logoutSub$) {
      this.logoutSub$.unsubscribe();
    }
    this.logoutSub$ = this.inactivityService.waitForLogout().subscribe((val) => {
      if (val) {
        this.logout();
        this.logoutSub$?.unsubscribe();
      }
    });
  }
}
