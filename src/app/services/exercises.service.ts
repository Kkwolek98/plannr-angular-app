import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { envConfig } from "../app.config";
import { Exercise, NewExerciseForm } from "../types/exercises/exercises";
import { ExtractFormControl } from "../types/utility/form";

@Injectable({
  providedIn: "root",
})
export class ExercisesService {
  private readonly http = inject(HttpClient);

  public getAllExercises$(): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(envConfig.url + "/exercises");
  }

  public createExercise$(data: ExtractFormControl<NewExerciseForm>): Observable<Exercise> {
    return this.http.post<Exercise>(envConfig.url + "/exercises", { ...data });
  }
}
