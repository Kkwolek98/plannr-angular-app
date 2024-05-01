import { inject } from "@angular/core";
import type { ResolveFn } from "@angular/router";
import { catchError, of } from "rxjs";
import { NotificationsService } from "../../../../../../shared/src/lib/notifications/services/notifications.service";
import { WorkoutsService } from "../../../../../../shared/src/lib/services/workouts.service";
import { Workout } from "../../../../../../shared/src/lib/types/workouts/workouts";

export const workoutsResolver: ResolveFn<Workout[]> = () => {
  const workoutsService = inject(WorkoutsService);
  const notificationsService = inject(NotificationsService);

  return workoutsService.getWorkouts().pipe(
    catchError(() => {
      notificationsService.open({
        type: "error",
        message: "Failed to load workouts",
      });

      return of([]);
    })
  );
};
