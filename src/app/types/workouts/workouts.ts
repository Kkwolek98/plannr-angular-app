import { FormControl } from "@angular/forms";

export type Workout = {
  id: string;
  name: string;
  description?: string;
  sets: unknown[];
  tags: string[];
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
