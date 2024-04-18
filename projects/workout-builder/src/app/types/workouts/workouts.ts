import { FormControl } from "@angular/forms";
import { User } from "../user/user";
import { ExerciseSet } from "./sets";

export type Workout = {
  id: string;
  name: string;
  description?: string;
  sets: ExerciseSet[];
  tags: string[];
  owner: User;
};

export type NewWorkoutForm = {
  name: FormControl<string>;
  description: FormControl<string | null>;
  tags: FormControl<string[]>;
};

export type NewWorkout = {
  name: string;
  description?: string;
  tags: string[];
};
