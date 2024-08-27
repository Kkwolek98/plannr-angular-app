import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-plan-new-user-step',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './plan-new-user-step.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanNewUserStepComponent { }
