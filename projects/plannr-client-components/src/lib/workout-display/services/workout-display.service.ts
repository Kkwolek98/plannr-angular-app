import { HttpErrorResponse } from "@angular/common/http";
import { Injectable, computed, inject, signal } from "@angular/core";
import { NotificationsService } from "@shared/notifications/services/notifications.service";
import { WorkoutsService } from "@shared/services/workouts.service";
import { Workout } from "@shared/types/workouts/workouts";
import { Observable, catchError, tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class WorkoutDisplayService {
  private workoutService = inject(WorkoutsService);
  private notificationsService = inject(NotificationsService);

  public data = signal<Workout | null>(null);
  public currentSet = computed(() => this.data()?.sets.find((set) => set.id === this.currentSetId()));
  public currentSetId = signal("");

  public getWorkoutData(workoutId: string): Observable<Workout> {
    this.data.set(null);

    return this.workoutService.getWorkout$(workoutId).pipe(
      tap((workout) => {
        this.data.set(workout);
      }),
      catchError((err: HttpErrorResponse) => {
        this.notificationsService.open({
          type: "error",
          message: err.error.message || err.message,
        });

        throw err;
      })
    );
  }

  public setCurrentSetId(id: string): void {
    this.currentSetId.set(id);
  }
}
