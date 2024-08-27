import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-plan-new-dates-step',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './plan-new-dates-step.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanNewDatesStepComponent { }
