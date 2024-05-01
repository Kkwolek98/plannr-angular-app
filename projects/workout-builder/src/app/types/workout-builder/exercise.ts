import { FormControl } from "@angular/forms";
import { RepType } from "../../../../../shared/src/lib/types/workouts/sets";

export type NewSetItemForm = {
  details: FormControl<string>;
  repMin: FormControl<number | null>;
  repMax: FormControl<number | null>;
  repExact: FormControl<number | null>;
  repType: FormControl<RepType>;
  repWeight: FormControl<number | null>;
  sort: FormControl<number>;
  rest: FormControl<number | null>;
};
