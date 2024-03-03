import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { envConfig } from "../app.config";
import { Exercise } from "../types/exercises/exercises";

@Injectable({
  providedIn: "root",
})
export class ExercisesService {
  private readonly http = inject(HttpClient);

  public getAllExercises(): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(envConfig.url + "/exercises");
  }
}
