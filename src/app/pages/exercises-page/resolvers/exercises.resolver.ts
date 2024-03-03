import { inject } from "@angular/core";
import type { ResolveFn } from "@angular/router";
import { ExercisesService } from "../../../services/exercises.service";
import { Exercise } from "../../../types/exercises/exercises";

export const exercisesResolver: ResolveFn<Exercise[]> = (route, state) => {
  const exercisesService = inject(ExercisesService);
  return exercisesService.getAllExercises();
};
