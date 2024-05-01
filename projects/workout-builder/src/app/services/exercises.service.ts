import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { envConfig } from "../../../../../envConfig";
import { Exercise, NewExerciseForm } from "../../../../shared/src/lib/types/exercises/exercises";
import { ExtractFormControl } from "../../../../shared/src/lib/types/utility/form";

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
