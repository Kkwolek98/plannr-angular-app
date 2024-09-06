import { WorkoutTemplate } from "@shared/types/workouts/workout-template";

export class PlanningSetTemplateAction {
  static readonly type = "[Planning] SetTemplate";
  constructor(public payload: WorkoutTemplate | null) {}
}

export class PlanningSetDatesAction {
  static readonly type = "[Planning] SetDates";
  constructor(public payload: Date[]) {}
}

export class PlanningResetStateAction {
  static readonly type = "[Planning] ResetState";
}
