import { Injectable } from "@angular/core";
import { jwtDecode } from "jwt-decode";
import { Observable, Subject, interval } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class InactivityService {
  private inactiveSubject$: Subject<boolean> = new Subject();
  public startListening(token: string): Observable<boolean> {
    const decoded = jwtDecode(token);

    if (!decoded.exp) {
      throw Error("Error decoding jwt");
    }

    const currentTimeInSeconds = Math.floor(Date.now() / 1000);
    const secondsToExpire = decoded.exp - currentTimeInSeconds;
    this.startTimer(secondsToExpire);

    return this.inactiveSubject$.asObservable();
  }

  private startTimer(secondsToExpire: number): void {
    const sub$ = interval(1000).subscribe((val) => {
      if (!(val % 240)) {
        console.log(`${(secondsToExpire - val) / 60}min until logout`);
      }
      if (val > secondsToExpire) {
        this.inactiveSubject$.next(true);
        this.inactiveSubject$.complete();
        sub$.unsubscribe();
      }
    });
  }
}
