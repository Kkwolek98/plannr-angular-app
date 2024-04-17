import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { envConfig } from "../../../envConfig";
import { NewWorkout, Workout } from "../types/workouts/workouts";

@Injectable({
  providedIn: "root",
})
export class WorkoutsService {
  private readonly http = inject(HttpClient);

  public getWorkouts(): Observable<Workout[]> {
    return this.http.get<Workout[]>(envConfig.url + "/workouts");
  }

  public getWorkout$(id: string): Observable<Workout> {
    return this.http.get<Workout>(envConfig.url + "/workouts/" + id);
  }

  public createWorkout$(data: NewWorkout): Observable<Workout> {
    return this.http.post<Workout>(envConfig.url + "/workouts", data);
  }

  public updateWorkout$(id: string, data: { name: string; description?: string }): Observable<Workout> {
    return this.http.put<Workout>(envConfig.url + "/workouts/" + id, data);
  }

  public createEmptySet(workoutId: string): Observable<Workout> {
    return this.http.post<Workout>(envConfig.url + "/workouts/" + workoutId + "/sets", { name: "New Set" });
  }
}
