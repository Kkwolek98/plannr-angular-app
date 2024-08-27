import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-plan-new-adjustments-step',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './plan-new-adjustments-step.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanNewAdjustmentsStepComponent { }
