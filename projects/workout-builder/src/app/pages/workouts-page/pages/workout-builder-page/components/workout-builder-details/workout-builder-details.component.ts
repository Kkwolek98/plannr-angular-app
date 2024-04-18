import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ButtonComponent } from "../../../../../../../../../shared/src/lib/inputs/button/button.component";
import { InputComponent } from "../../../../../../../../../shared/src/lib/inputs/input/input.component";
import { NotificationsService } from "../../../../../../../../../shared/src/lib/notifications/services/notifications.service";
import { WorkoutBuilderService } from "../../../../../../services/workout-builder.service";

@Component({
  selector: "app-workout-builder-details",
  standalone: true,
  templateUrl: "./workout-builder-details.component.html",
  styleUrl: "./workout-builder-details.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, InputComponent, ReactiveFormsModule, ButtonComponent],
})
export class WorkoutBuilderDetailsComponent {
  readonly workoutBuilderService = inject(WorkoutBuilderService);
  private readonly notificationsService = inject(NotificationsService);

  readonly data = toSignal(this.workoutBuilderService.data);
  readonly isEditMode = signal<boolean>(false);

  form = new FormGroup({
    name: new FormControl("", { validators: [Validators.required] }),
    description: new FormControl<string | undefined>(""),
  });

  toggleEditMode(): void {
    const isEditMode = this.isEditMode();

    if (!isEditMode) {
      const workout = this.data();

      if (workout) {
        this.form.setValue({
          name: workout.name,
          description: workout.description,
        });
      }
    }

    this.isEditMode.set(!isEditMode);
  }

  saveChanges(): void {
    if (this.form.invalid) {
      throw Error("Form is invalid");
    }

    const value = this.form.value;

    this.workoutBuilderService.updateWorkoutDetails(value as { name: string; description?: string }).subscribe({
      next: () => {
        this.isEditMode.set(false);
        this.notificationsService.open({
          message: "Workout details updated",
          type: "success",
        });
      },
      error: () => {
        this.notificationsService.open({
          message: "Failed to update workout details",
          type: "error",
        });
      },
    });
  }
}
