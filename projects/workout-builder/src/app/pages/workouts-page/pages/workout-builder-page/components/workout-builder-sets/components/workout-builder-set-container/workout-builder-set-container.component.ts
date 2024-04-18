import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-workout-builder-set-container",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./workout-builder-set-container.component.html",
  styleUrl: "./workout-builder-set-container.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkoutBuilderSetContainerComponent {}
