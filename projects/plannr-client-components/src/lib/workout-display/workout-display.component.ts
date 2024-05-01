import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, input } from "@angular/core";
import { WorkoutDisplayService } from "./services/workout-display.service";

@Component({
  selector: "lib-workout-display",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./workout-display.component.html",
  styleUrl: "./workout-display.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkoutDisplayComponent {
  private workoutDisplayService = inject(WorkoutDisplayService);

  workoutId = input.required<string, string>({
    transform: (id) => {
      this.workoutDisplayService.getWorkoutData(id).subscribe();

      return id;
    },
  });
}
