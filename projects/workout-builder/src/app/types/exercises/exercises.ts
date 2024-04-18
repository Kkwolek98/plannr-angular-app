import { FormControl } from "@angular/forms";

export type Exercise = {
  id: string;
  name: string;
  description?: string;
  tags: string[];
  videos: string[];
};

export type NewExerciseForm = {
  name: FormControl<string>;
  description: FormControl<string | null>;
  videos: FormControl<string[]>;
  tags: FormControl<string[]>;
};
