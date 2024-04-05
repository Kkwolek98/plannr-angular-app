import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { envConfig } from "../../../envConfig";
import { ExerciseSet, SetItem } from "../types/workouts/sets";

@Injectable({
  providedIn: "root",
})
export class SetsService {
  private readonly http = inject(HttpClient);

  public addSetItemToSet$(setId: string, setItem: Partial<SetItem>): Observable<ExerciseSet> {
    return this.http.post<ExerciseSet>(envConfig.url + "/sets/" + setId + "/items", setItem);
  }

  public removeSet$(setId: string): Observable<{ removed: boolean }> {
    return this.http.delete<{ removed: boolean }>(envConfig.url + "/sets/" + setId);
  }
}
