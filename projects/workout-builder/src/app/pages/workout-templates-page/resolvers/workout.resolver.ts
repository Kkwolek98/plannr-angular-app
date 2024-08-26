import { inject } from "@angular/core";
import type { ResolveFn } from "@angular/router";
import { WorkoutTemplatesService } from "../../../../../../shared/src/lib/services/workout-templates.service";
import { WorkoutTemplate } from "../../../../../../shared/src/lib/types/workouts/workout-template";

export const workoutResolver: ResolveFn<WorkoutTemplate> = (route) => {
  const id = route.paramMap.get("id");

  if (!id) {
    throw Error("No id provided in route.");
  }

  const workoutsService = inject(WorkoutTemplatesService);

  return workoutsService.getWorkoutTemplate$(id);
};
