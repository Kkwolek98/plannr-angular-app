import { Injectable, inject, signal } from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";
import { Observable, tap } from "rxjs";
import { WorkoutTemplatesService } from "../../../../shared/src/lib/services/workout-templates.service";
import { ExerciseSet, SetItem } from "../../../../shared/src/lib/types/workouts/sets";
import { WorkoutTemplate } from "../../../../shared/src/lib/types/workouts/workout-template";
import { SetsService } from "./sets.service";

@Injectable({
  providedIn: "root",
})
export class WorkoutBuilderService {
  private readonly workoutsService = inject(WorkoutTemplatesService);
  private readonly setsService = inject(SetsService);

  private readonly _dataSignal = signal<WorkoutTemplate | undefined>(undefined);
  private readonly editedSetItemId = signal<string | null>(null);

  public readonly data = toObservable(this._dataSignal);
  public readonly openSetsIds = signal<Set<string>>(new Set());
  public readonly editedSetItemId$ = toObservable(this.editedSetItemId);

  public setWorkout(workout: WorkoutTemplate): void {
    this._dataSignal.set(workout);
  }

  public clearWorkout(): void {
    this._dataSignal.set(undefined);
  }

  public updateWorkoutDetails(workoutDetails: {
    name: string;
    description?: string;
  }): Observable<WorkoutTemplate> {
    return this.workoutsService.updateWorkoutTemplate$(this._dataSignal()!.id, workoutDetails).pipe(
      tap((workout) => {
        this._dataSignal.set(workout);
      })
    );
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

  public setItemId(setItemId: string | null): void {
    this.editedSetItemId.set(setItemId);
  }

  public addEmptySet(): Observable<WorkoutTemplate> {
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

  public removeSet(setId: string): Observable<{ removed: boolean }> {
    return this.setsService.removeSet$(setId).pipe(
      tap(({ removed }) => {
        if (!removed) {
          throw Error("Set was not removed");
        }
        const workout = this._dataSignal()!;

        workout.sets = workout.sets.filter((set) => set.id !== setId); // remove set
        workout.sets = workout.sets.map((set, index) => ({ ...set, sort: index })); // adjust sort

        this._dataSignal.set(structuredClone(workout));
      })
    );
  }

  public updateSet(setId: string, set: Partial<ExerciseSet>): Observable<ExerciseSet> {
    return this.setsService.updateSet$(setId, set).pipe(
      tap((updatedSet) => {
        const workout = this._dataSignal()!;
        const editedSetIndex = workout?.sets.findIndex((el) => el.id === setId);

        if (editedSetIndex === undefined || editedSetIndex < 0) {
          throw Error("Invalid set id");
        }

        workout.sets[editedSetIndex] = updatedSet;

        this._dataSignal.set(structuredClone(workout));
      })
    );
  }

  public addSetItemToSet(setId: string, setItem: Partial<SetItem>): Observable<ExerciseSet> {
    return this.setsService.addSetItemToSet$(setId, setItem).pipe(
      tap((set) => {
        const workout = this._dataSignal()!;
        const editedSetIndex = workout?.sets.findIndex((el) => el.id === setId);

        if (editedSetIndex === undefined || editedSetIndex < 0) {
          throw Error("Invalid set id");
        }

        workout.sets[editedSetIndex] = set;

        this._dataSignal.set(structuredClone(workout));
      })
    );
  }

  public updateSetItem(setItemId: string, setItem: Partial<SetItem>): Observable<SetItem> {
    return this.setsService.updateSetItem$(setItemId, setItem).pipe(
      tap((updatedSetItem) => {
        const workout = this._dataSignal()!;
        const editedSetIndex = workout?.sets.findIndex((el) =>
          el.setItems.map((item) => item.id).includes(setItemId)
        );

        if (editedSetIndex === undefined || editedSetIndex < 0) {
          throw Error("Invalid set id");
        }

        const editedSetItemIndex = workout.sets[editedSetIndex].setItems.findIndex(
          (item) => item.id === setItemId
        );

        if (editedSetItemIndex === undefined || editedSetItemIndex < 0) {
          throw Error("Invalid set item id");
        }

        workout.sets[editedSetIndex].setItems[editedSetItemIndex] = updatedSetItem;

        this._dataSignal.set(structuredClone(workout));
      })
    );
  }

  public removeSetItem(setItemId: string): Observable<{ removed: boolean }> {
    return this.setsService.removeSetItem$(setItemId).pipe(
      tap(({ removed }) => {
        if (!removed) {
          throw Error("Set item was not removed");
        }

        const workout = this._dataSignal()!;
        const editedSetIndex = workout?.sets.findIndex((el) =>
          el.setItems.map((item) => item.id).includes(setItemId)
        );

        if (editedSetIndex === undefined || editedSetIndex < 0) {
          throw Error("Invalid set id");
        }

        workout.sets[editedSetIndex].setItems = workout.sets[editedSetIndex].setItems.filter(
          (item) => item.id !== setItemId
        );

        this._dataSignal.set(structuredClone(workout));
      })
    );
  }
}
