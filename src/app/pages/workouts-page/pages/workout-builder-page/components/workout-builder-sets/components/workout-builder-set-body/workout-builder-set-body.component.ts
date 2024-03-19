import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-workout-builder-set-body",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./workout-builder-set-body.component.html",
  styleUrl: "./workout-builder-set-body.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkoutBuilderSetBodyComponent {}
