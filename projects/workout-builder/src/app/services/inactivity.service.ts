import { Injectable } from "@angular/core";
import { jwtDecode } from "jwt-decode";
import { Observable, Subject, Subscription, interval } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class InactivityService {
  private timer$?: Subscription;
  private inactiveSubject$: Subject<boolean> = new Subject();
  public startListening(token: string): void {
    const decoded = jwtDecode(token);

    if (!decoded.exp) {
      throw Error("Error decoding jwt");
    }

    const currentTimeInSeconds = Math.floor(Date.now() / 1000);
    const secondsToExpire = decoded.exp - currentTimeInSeconds;
    this.startTimer(secondsToExpire);
  }

  public waitForLogout(): Observable<boolean> {
    return this.inactiveSubject$.asObservable();
  }

  private startTimer(secondsToExpire: number): void {
    if (this.timer$) {
      this.timer$.unsubscribe();
    }

    this.timer$ = interval(1000).subscribe((val) => {
      if (!(val % 240)) {
        console.log(`${((secondsToExpire - val) / 60).toFixed(2)}min until logout`);
      }
      if (val > secondsToExpire) {
        this.inactiveSubject$.next(true);
        this.inactiveSubject$.complete();
        this.timer$?.unsubscribe();
      }
    });
  }
}
