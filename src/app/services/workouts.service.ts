import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { envConfig } from "../app.config";
import { NewWorkout, Workout } from "../types/workouts/workouts";

@Injectable({
  providedIn: "root",
})
export class WorkoutsService {
  private readonly http = inject(HttpClient);

  public getWorkouts(): Observable<Workout[]> {
    return this.http.get<Workout[]>(envConfig.url + "/workouts");
  }

  public createWorkout$(data: NewWorkout): Observable<Workout> {
    return this.http.post<Workout>(envConfig.url + "/workouts", data);
  }
}
