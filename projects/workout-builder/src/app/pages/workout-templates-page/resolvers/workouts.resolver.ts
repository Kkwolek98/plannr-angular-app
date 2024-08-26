import { inject } from "@angular/core";
import type { ResolveFn } from "@angular/router";
import { catchError, of } from "rxjs";
import { NotificationsService } from "../../../../../../shared/src/lib/notifications/services/notifications.service";
import { WorkoutTemplatesService } from "../../../../../../shared/src/lib/services/workout-templates.service";
import { WorkoutTemplate } from "../../../../../../shared/src/lib/types/workouts/workout-template";

export const workoutTemplatesResolver: ResolveFn<WorkoutTemplate[]> = () => {
  const workoutsService = inject(WorkoutTemplatesService);
  const notificationsService = inject(NotificationsService);

  return workoutsService.getWorkoutTemplates$().pipe(
    catchError(() => {
      notificationsService.open({
        type: "error",
        message: "Failed to load workouts",
      });

      return of([]);
    })
  );
};
