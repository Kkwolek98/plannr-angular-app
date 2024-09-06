import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngxs/store";
import { SelectComponent } from "@shared/inputs/select/select.component";
import { TagComponent } from "@shared/tag/tag.component";
import { WorkoutTemplate } from "@shared/types/workouts/workout-template";
import { PlanningSetTemplateAction } from "@workout-builder/app/pages/planning-page/store/state/planning.actions";
import { PlanningState } from "@workout-builder/app/pages/planning-page/store/state/planning.state";
import { map } from "rxjs";
import { PlanNewTemplateStepForm } from "../plan-new-form";

@Component({
  selector: "app-plan-new-workout-template-step",
  standalone: true,
  imports: [CommonModule, SelectComponent, ReactiveFormsModule, TagComponent],
  templateUrl: "./plan-new-workout-template-step.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanNewWorkoutTemplateStepComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly store = inject(Store);

  workoutTemplates = toSignal(
    this.route.data.pipe(map((data) => data["workoutTemplates"] as WorkoutTemplate[]))
  );
  templatePreview = toSignal(this.store.select(PlanningState.template));

  form: FormGroup<PlanNewTemplateStepForm> = new FormGroup({
    workoutTemplateId: new FormControl(),
  });

  constructor() {
    this.form.get("workoutTemplateId")?.valueChanges.subscribe((val) => this.selectWorkoutTemplate(val));
  }

  private selectWorkoutTemplate(id: string | null): void {
    const template = this.workoutTemplates()?.find((el) => el.id === id);
    this.store.dispatch(new PlanningSetTemplateAction(template ?? null));
  }
}
