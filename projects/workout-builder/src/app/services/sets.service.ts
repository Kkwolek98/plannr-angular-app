import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { envConfig } from "../../../../../envConfig";
import { ExerciseSet, SetItem } from "../../../../shared/src/lib/types/workouts/sets";

@Injectable({
  providedIn: "root",
})
export class SetsService {
  private readonly http = inject(HttpClient);

  public addSetItemToSet$(setId: string, setItem: Partial<SetItem>): Observable<ExerciseSet> {
    return this.http.post<ExerciseSet>(envConfig.url + "/sets/" + setId + "/items", setItem);
  }

  public updateSetItem$(setItemId: string, setItem: Partial<SetItem>): Observable<SetItem> {
    return this.http.put<SetItem>(envConfig.url + "/sets/items/" + setItemId, setItem);
  }

  public removeSet$(setId: string): Observable<{ removed: boolean }> {
    return this.http.delete<{ removed: boolean }>(envConfig.url + "/sets/" + setId);
  }

  public updateSet$(setId: string, set: Partial<ExerciseSet>): Observable<ExerciseSet> {
    return this.http.put<ExerciseSet>(envConfig.url + "/sets/" + setId, set);
  }

  public removeSetItem$(itemId: string): Observable<{ removed: boolean }> {
    return this.http.delete<{ removed: boolean }>(envConfig.url + "/sets/items/" + itemId);
  }
}
