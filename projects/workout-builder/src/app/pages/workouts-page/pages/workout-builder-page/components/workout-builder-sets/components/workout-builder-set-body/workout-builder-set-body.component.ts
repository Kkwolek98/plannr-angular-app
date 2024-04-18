import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from "@angular/core";
import { ButtonComponent } from "../../../../../../../../../../../shared/src/lib/inputs/button/button.component";
import { WorkoutBuilderService } from "../../../../../../../../services/workout-builder.service";
import { ExerciseSet } from "../../../../../../../../types/workouts/sets";
import { WorkoutBuilderSetFormComponent } from "../workout-builder-set-header/components/workout-builder-set-form/workout-builder-set-form.component";
import { WorkoutBuilderSetItemComponent } from "../workout-builder-set-header/components/workout-builder-set-item/workout-builder-set-item.component";

@Component({
  selector: "app-workout-builder-set-body",
  standalone: true,
  templateUrl: "./workout-builder-set-body.component.html",
  styleUrl: "./workout-builder-set-body.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ButtonComponent, WorkoutBuilderSetItemComponent, WorkoutBuilderSetFormComponent],
})
export class WorkoutBuilderSetBodyComponent {
  private readonly workoutBuilderService = inject(WorkoutBuilderService);

  public readonly set = input.required<ExerciseSet>();

  readonly addingNewExercise = signal(false);
  readonly isOpen = computed(() => this.workoutBuilderService.openSetsIds().has(this.set().id));
  readonly editedSetItemId$ = this.workoutBuilderService.editedSetItemId$;

  public addNewExercise(): void {
    this.addingNewExercise.set(true);
    this.workoutBuilderService.setItemId(null);
  }
}
