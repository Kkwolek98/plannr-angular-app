import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, input } from "@angular/core";
import { WorkoutDisplaySetPickerComponent } from "./components/workout-display-set-picker/workout-display-set-picker.component";
import { WorkoutDisplayService } from "./services/workout-display.service";

@Component({
  selector: "lib-workout-display",
  standalone: true,
  imports: [CommonModule, WorkoutDisplaySetPickerComponent],
  templateUrl: "./workout-display.component.html",
  styleUrl: "./workout-display.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkoutDisplayComponent {
  private workoutDisplayService = inject(WorkoutDisplayService);

  data = this.workoutDisplayService.data;

  workoutId = input.required<string, string>({
    transform: (id) => {
      this.workoutDisplayService.getWorkoutData(id).subscribe();

      return id;
    },
  });
}
