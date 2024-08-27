import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-plan-new-group-step',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './plan-new-group-step.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanNewGroupStepComponent { }
