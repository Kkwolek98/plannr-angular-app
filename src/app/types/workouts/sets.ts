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

export type RepType = "kg" | "lb" | "RPE" | "min" | "s";
