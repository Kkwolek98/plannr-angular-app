import { FormControl } from "@angular/forms";
import { User } from "../user/user";

export type Workout = {
  id: string;
  name: string;
  description?: string;
  sets: unknown[];
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
