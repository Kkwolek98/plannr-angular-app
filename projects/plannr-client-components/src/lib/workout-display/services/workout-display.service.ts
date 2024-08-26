import { HttpErrorResponse } from "@angular/common/http";
import { Injectable, computed, inject, signal } from "@angular/core";
import { NotificationsService } from "@shared/notifications/services/notifications.service";
import { WorkoutTemplatesService } from "@shared/services/workout-templates.service";
import { WorkoutTemplate } from "@shared/types/workouts/workout-template";
import { Observable, catchError, tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class WorkoutDisplayService {
  private workoutTemplatesService = inject(WorkoutTemplatesService);
  private notificationsService = inject(NotificationsService);

  public data = signal<WorkoutTemplate | null>(null);
  public currentSet = computed(() => this.data()?.sets.find((set) => set.id === this.currentSetId()));
  public currentSetId = signal("");

  public getWorkoutData(workoutId: string): Observable<WorkoutTemplate> {
    this.data.set(null);

    return this.workoutTemplatesService.getWorkoutTemplate$(workoutId).pipe(
      tap((workout) => {
        this.data.set(workout);
        this.currentSetId.set(workout.sets[0].id);
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
