import { inject } from "@angular/core";
import type { ResolveFn } from "@angular/router";
import { NotificationsService } from "@shared/notifications/services/notifications.service";
import { WorkoutTemplatesService } from "@shared/services/workout-templates.service";
import { WorkoutTemplate } from "@shared/types/workouts/workout-template";
import { catchError, of } from "rxjs";

export const workoutTemplatesResolver: ResolveFn<WorkoutTemplate[]> = () => {
  const workoutsService = inject(WorkoutTemplatesService);
  const notificationsService = inject(NotificationsService);

  return workoutsService.getWorkoutTemplates$().pipe(
    catchError(() => {
      notificationsService.open({
        type: "error",
        message: "Failed to load workout templates",
      });

      return of([]);
    })
  );
};
