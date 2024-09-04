import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { ExerciseSet } from "@shared/types/workouts/sets";
import { WorkoutTemplate } from "@shared/types/workouts/workout-template";
import { PlanningSetDatesAction, PlanningSetTemplateAction } from "./planning.actions";

export type PlanningStateModel = {
  groupId: string;
  userId: string;
  template: WorkoutTemplate;
  plannedWorkouts: {
    differences: ExerciseSet[];
    date: Date;
  }[];
};

const defaults = {
  groupId: "",
  userId: "",
  template: {} as WorkoutTemplate,
  plannedWorkouts: [],
};

@State<PlanningStateModel>({
  name: "planning",
  defaults,
})
@Injectable()
export class PlanningState {
  @Selector()
  static template(state: PlanningStateModel) {
    return state.template;
  }

  @Selector()
  static plannedWorkouts(state: PlanningStateModel) {
    return state.plannedWorkouts;
  }

  @Action(PlanningSetTemplateAction)
  resetState({ setState }: StateContext<PlanningStateModel>) {
    setState({ ...defaults });
  }

  @Action(PlanningSetTemplateAction)
  setTemplate(
    { getState, setState }: StateContext<PlanningStateModel>,
    { payload }: PlanningSetTemplateAction
  ) {
    const state = getState();
    setState({ ...state, template: payload });
  }

  @Action(PlanningSetDatesAction)
  setDates({ getState, setState }: StateContext<PlanningStateModel>, { payload }: PlanningSetDatesAction) {
    const state = getState();
    const plannedWorkouts = payload.map((date) => ({ differences: [], date }));
    setState({ ...state, plannedWorkouts });
  }
}
