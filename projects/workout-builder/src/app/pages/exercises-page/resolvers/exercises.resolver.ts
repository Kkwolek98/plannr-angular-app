import { inject } from "@angular/core";
import type { ResolveFn } from "@angular/router";
import { Exercise } from "../../../../../../shared/src/lib/types/exercises/exercises";
import { ExercisesService } from "../../../services/exercises.service";

export const exercisesResolver: ResolveFn<Exercise[]> = () => {
  const exercisesService = inject(ExercisesService);
  return exercisesService.getAllExercises$();
};
