import { Injectable, inject, signal } from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";
import { Observable, tap } from "rxjs";
import { ExerciseSet } from "../types/workouts/sets";
import { Workout } from "../types/workouts/workouts";
import { SetsService } from "./sets.service";
import { WorkoutsService } from "./workouts.service";

@Injectable({
  providedIn: "root",
})
export class WorkoutBuilderService {
  private readonly workoutsService = inject(WorkoutsService);
  private readonly setsService = inject(SetsService);

  private readonly _dataSignal = signal<Workout | undefined>(undefined);
  public readonly data = toObservable(this._dataSignal);
  public readonly openSetsIds = signal<Set<string>>(new Set());

  public setWorkout(workout: Workout): void {
    this._dataSignal.set(workout);
  }

  public clearWorkout(): void {
    this._dataSignal.set(undefined);
  }

  public toggleSet(id: string): void {
    const openSetsIds = this.openSetsIds();

    if (openSetsIds.has(id)) {
      openSetsIds.delete(id);
    } else {
      openSetsIds.add(id);
    }

    this.openSetsIds.set(new Set(openSetsIds));
  }

  public addEmptySet(): Observable<Workout> {
    const id = this._dataSignal()?.id;

    if (!id) {
      throw Error("Workout not set");
    }

    return this.workoutsService.createEmptySet(id).pipe(
      tap((workout) => {
        this._dataSignal.set(workout);
      })
    );
  }

  public addSetItemToSet(setId: string, setItem: Partial<ExerciseSet>): Observable<ExerciseSet> {
    return this.setsService.addSetItemToSet$(setId, setItem).pipe(
      tap((set) => {
        const currentData = this._dataSignal()!;
        const editedSetIndex = currentData?.sets.findIndex((el) => el.id === setId);

        if (editedSetIndex === undefined || editedSetIndex < 0) {
          throw Error("Invalid set id");
        }

        currentData.sets[editedSetIndex] = set;

        this._dataSignal.set(structuredClone(currentData));
      })
    );
  }
}
