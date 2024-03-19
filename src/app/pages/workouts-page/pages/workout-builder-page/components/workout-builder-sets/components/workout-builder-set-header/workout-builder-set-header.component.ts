import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { ExerciseSet } from "../../../../../../../../types/workouts/sets";

@Component({
  selector: "app-workout-builder-set-header",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./workout-builder-set-header.component.html",
  styleUrl: "./workout-builder-set-header.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkoutBuilderSetHeaderComponent {
  public set = input.required<ExerciseSet>();
}
