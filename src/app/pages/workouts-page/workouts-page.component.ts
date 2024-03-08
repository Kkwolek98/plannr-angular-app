import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-workouts-page",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./workouts-page.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkoutsPageComponent {}
