import { RepType } from "../../../../../shared/src/lib/types/workouts/sets";

export const REP_TYPES: RepType[] = ["kg", "lb", "RPE", "min", "s"] as const;
export const REP_TYPES_SELECT: { key: RepType; value: string }[] = [
  { key: "kg", value: "kg" },
  { key: "lb", value: "lb" },
  { key: "RPE", value: "RPE" },
  { key: "min", value: "minutes" },
  { key: "s", value: "seconds" },
];
