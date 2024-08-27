import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-plan-new-workout-template-step',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './plan-new-workout-template-step.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanNewWorkoutTemplateStepComponent { }
