import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, computed, inject, input } from "@angular/core";
import { ExerciseSet } from "../../../../../../../../../../../shared/src/lib/types/workouts/sets";
import { WorkoutBuilderService } from "../../../../../../../../services/workout-builder.service";

@Component({
  selector: "app-workout-builder-set-header",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./workout-builder-set-header.component.html",
  styleUrl: "./workout-builder-set-header.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkoutBuilderSetHeaderComponent {
  private readonly workoutBuilderService = inject(WorkoutBuilderService);

  public set = input.required<ExerciseSet>();
  public index = input.required<number>();

  readonly setLetter = computed(() => String.fromCharCode(65 + this.index()));
  readonly isOpen = computed(() => this.workoutBuilderService.openSetsIds().has(this.set().id));

  public toggleSetOpen(): void {
    this.workoutBuilderService.toggleSet(this.set().id);
  }
}
