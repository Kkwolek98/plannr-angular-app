import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { WorkoutDisplayService } from "@client-components/workout-display/services/workout-display.service";
import { ButtonComponent } from "@shared/inputs/button/button.component";
import { SpinnerComponent } from "@shared/spinner/spinner.component";
import { WorkoutDisplayExerciseComponent } from "../workout-display-exercise/workout-display-exercise.component";

@Component({
  selector: "lib-workout-display-current-set",
  standalone: true,
  imports: [CommonModule, SpinnerComponent, ButtonComponent, WorkoutDisplayExerciseComponent],
  templateUrl: "./workout-display-current-set.component.html",
  styleUrl: "./workout-display-current-set.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkoutDisplayCurrentSetComponent {
  private workoutDisplayService = inject(WorkoutDisplayService);

  currentSet = this.workoutDisplayService.currentSet;
}
