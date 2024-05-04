import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { ButtonComponent } from "@shared/inputs/button/button.component";
import { TimePipe } from "@shared/pipes/time.pipe";
import { SetItem } from "@shared/types/workouts/sets";

@Component({
  selector: "lib-workout-display-exercise",
  standalone: true,
  imports: [CommonModule, TimePipe, ButtonComponent],
  templateUrl: "./workout-display-exercise.component.html",
  styleUrl: "./workout-display-exercise.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkoutDisplayExerciseComponent {
  public setItem = input.required<SetItem>();
  public setItemIndex = input.required<number, number>({ transform: (val) => val + 1 });
}
