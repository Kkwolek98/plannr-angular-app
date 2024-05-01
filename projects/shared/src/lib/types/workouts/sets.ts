import { FormControl } from "@angular/forms";
import { Exercise } from "../exercises/exercises";

export type ExerciseSet = {
  id: string;
  name: string;
  description?: string;
  setItems: SetItem[];
  rest?: number;
  sort: number;
};

export type SetItem = {
  id: string;
  exerciseSet: ExerciseSet;
  details: Exercise;
  repMin?: number;
  repMax?: number;
  repExact?: number;
  repWeight?: number;
  repType?: RepType;
  rest?: number;
  sort: number;
};

export type SetEditForm = {
  name: FormControl<string>;
  description: FormControl<string | undefined>;
  rest: FormControl<number | undefined>;
};

export type RepType = "kg" | "lb" | "RPE" | "min" | "s";
