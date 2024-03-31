import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { ExerciseSet } from "../../../../../../../../types/workouts/sets";

@Component({
  selector: "app-workout-builder-set-details-drawer",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./workout-builder-set-details-drawer.component.html",
  styleUrl: "./workout-builder-set-details-drawer.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkoutBuilderSetDetailsDrawerComponent {
  public drawerData = input<ExerciseSet | null>(null);
}
