import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { Store } from "@ngxs/store";
import { PlanningState } from "@workout-builder/app/pages/planning-page/store/state/planning.state";

@Component({
  selector: "app-plan-new-workout-template-step",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./plan-new-workout-template-step.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanNewWorkoutTemplateStepComponent {
  private store = inject(Store);

  selectedTemplate = toSignal(this.store.select(PlanningState.template));
}
