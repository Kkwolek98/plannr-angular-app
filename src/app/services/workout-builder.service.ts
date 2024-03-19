import { Injectable, inject, signal } from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";
import { Observable, tap } from "rxjs";
import { Workout } from "../types/workouts/workouts";
import { WorkoutsService } from "./workouts.service";

@Injectable({
  providedIn: "root",
})
export class WorkoutBuilderService {
  private readonly workoutsService = inject(WorkoutsService);

  private readonly _dataSignal = signal<Workout | undefined>(undefined);
  public readonly data = toObservable(this._dataSignal);

  public setWorkout(workout: Workout): void {
    this._dataSignal.set(workout);
  }

  public clearWorkout(): void {
    this._dataSignal.set(undefined);
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
}
