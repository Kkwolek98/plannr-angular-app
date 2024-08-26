import { FormControl } from "@angular/forms";
import { User } from "../user/user";
import { ExerciseSet } from "./sets";

export type WorkoutTemplate = {
  id: string;
  name: string;
  description?: string;
  sets: ExerciseSet[];
  tags: string[];
  owner: User;
};

export type NewWorkoutTemplateForm = {
  name: FormControl<string>;
  description: FormControl<string | null>;
  tags: FormControl<string[]>;
};

export type NewWorkoutTemplate = {
  name: string;
  description?: string;
  tags: string[];
};
