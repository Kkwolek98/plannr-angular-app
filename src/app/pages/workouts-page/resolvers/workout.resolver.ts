import { inject } from "@angular/core";
import type { ResolveFn } from "@angular/router";
import { WorkoutsService } from "../../../services/workouts.service";
import { Workout } from "../../../types/workouts/workouts";

export const workoutResolver: ResolveFn<Workout> = (route) => {
  const id = route.paramMap.get("id");

  if (!id) {
    throw Error("No id provided in route.");
  }

  const workoutsService = inject(WorkoutsService);

  return workoutsService.getWorkout$(id);
};
