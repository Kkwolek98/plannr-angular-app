import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { envConfig } from "envConfig";
import { map, Observable } from "rxjs";
import { UserDetails } from "../types/user/user-details";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private readonly http = inject(HttpClient);

  public getCurrentUserDetails$(): Observable<UserDetails> {
    return this.http.get<UserDetails>(envConfig.url + "/user/details");
  }

  public updateCurrentUserDetails$(details: Partial<UserDetails>): Observable<UserDetails> {
    return this.http.put<UserDetails>(envConfig.url + "/user/details", details).pipe(
      map((res: any) => {
        delete res["id"];
        return res as UserDetails;
      })
    );
  }
}
