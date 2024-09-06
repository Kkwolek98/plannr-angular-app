import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, OnDestroy, viewChild } from "@angular/core";
import { Store } from "@ngxs/store";
import { ButtonComponent } from "@shared/inputs/button/button.component";
import { PlanningResetStateAction } from "../../store/state/planning.actions";
import { PlanNewNavigationComponent } from "./components/plan-new-navigation/plan-new-navigation.component";
import { PlanNewAdjustmentsStepComponent } from "./components/plan-new-steps/plan-new-adjustments-step/plan-new-adjustments-step.component";
import { PlanNewDatesStepComponent } from "./components/plan-new-steps/plan-new-dates-step/plan-new-dates-step.component";
import { PlanNewGroupStepComponent } from "./components/plan-new-steps/plan-new-group-step/plan-new-group-step.component";
import { PlanNewUserStepComponent } from "./components/plan-new-steps/plan-new-user-step/plan-new-user-step.component";
import { PlanNewWorkoutTemplateStepComponent } from "./components/plan-new-steps/plan-new-workout-template-step/plan-new-workout-template-step.component";
import { PlanningTab } from "./enums/planning-tab.enum";

@Component({
  selector: "app-plan-new-page",
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    PlanNewNavigationComponent,
    PlanNewGroupStepComponent,
    PlanNewUserStepComponent,
    PlanNewWorkoutTemplateStepComponent,
    PlanNewAdjustmentsStepComponent,
    PlanNewDatesStepComponent,
  ],
  templateUrl: "./plan-new-page.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanNewPageComponent implements OnDestroy {
  private readonly store = inject(Store);
  PlanningTab = PlanningTab;

  navigation = viewChild<PlanNewNavigationComponent>("navigation");

  ngOnDestroy(): void {
    console.log("??");
    this.store.dispatch(new PlanningResetStateAction());
  }
}
