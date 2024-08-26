import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, map } from "rxjs";
import { envConfig } from "../../../../../envConfig";
import { NewWorkoutTemplate, WorkoutTemplate } from "../types/workouts/workout-template";

@Injectable({
  providedIn: "root",
})
export class WorkoutTemplatesService {
  private readonly http = inject(HttpClient);

  public getWorkoutTemplates$(): Observable<WorkoutTemplate[]> {
    return this.http.get<WorkoutTemplate[]>(envConfig.url + "/workout-templates");
  }

  public getWorkoutTemplate$(id: string): Observable<WorkoutTemplate> {
    return this.http.get<WorkoutTemplate>(envConfig.url + "/workout-templates/" + id).pipe(
      map((workout) => {
        workout.sets = workout.sets.sort((a, b) => a.sort - b.sort);
        return workout;
      })
    );
  }

  public createWorkoutTemplate$(data: NewWorkoutTemplate): Observable<WorkoutTemplate> {
    return this.http.post<WorkoutTemplate>(envConfig.url + "/workout-templates", data);
  }

  public updateWorkoutTemplate$(
    id: string,
    data: { name: string; description?: string }
  ): Observable<WorkoutTemplate> {
    return this.http.put<WorkoutTemplate>(envConfig.url + "/workout-templates/" + id, data);
  }

  public createEmptySet(workoutTemplateId: string): Observable<WorkoutTemplate> {
    return this.http.post<WorkoutTemplate>(
      envConfig.url + "/workout-templates/" + workoutTemplateId + "/sets",
      {
        name: "New Set",
      }
    );
  }
}
