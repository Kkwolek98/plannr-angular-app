import { inject } from "@angular/core";
import type { ResolveFn } from "@angular/router";
import { WorkoutsService } from "../../../services/workouts.service";
import { Workout } from "../../../types/workouts/workouts";

export const workoutsResolver: ResolveFn<Workout[]> = () => {
  const workoutsService = inject(WorkoutsService);
  return workoutsService.getWorkouts();
};
