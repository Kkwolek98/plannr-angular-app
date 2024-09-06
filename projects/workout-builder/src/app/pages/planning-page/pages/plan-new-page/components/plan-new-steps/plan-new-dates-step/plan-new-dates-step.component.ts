import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DatepickerComponent } from "@shared/datepicker/datepicker.component";

@Component({
  selector: "app-plan-new-dates-step",
  standalone: true,
  imports: [CommonModule, DatepickerComponent],
  templateUrl: "./plan-new-dates-step.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanNewDatesStepComponent {}
