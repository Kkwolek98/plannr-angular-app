import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, signal } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ButtonComponent } from "../../../../../../../shared/src/lib/inputs/button/button.component";
import { InputComponent } from "../../../../../../../shared/src/lib/inputs/input/input.component";
import { TagInputComponent } from "../../../../../../../shared/src/lib/inputs/tag-input/tag-input.component";
import { ModalComponent } from "../../../../../../../shared/src/lib/modals/components/modal/modal.component";
import { WorkoutsService } from "../../../../../../../shared/src/lib/services/workouts.service";
import {
  NewWorkout,
  NewWorkoutForm,
  Workout,
} from "../../../../../../../shared/src/lib/types/workouts/workouts";

@Component({
  selector: "app-new-workout-modal",
  standalone: true,
  templateUrl: "./new-workout-modal.component.html",
  styleUrl: "./new-workout-modal.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, InputComponent, ReactiveFormsModule, ButtonComponent, TagInputComponent],
})
export class NewWorkoutModalComponent extends ModalComponent<undefined, Workout | undefined> {
  private readonly workoutsService = inject(WorkoutsService);

  protected loading = signal<boolean>(false);
  protected form: FormGroup<NewWorkoutForm> = new FormGroup({
    name: new FormControl("", { validators: [Validators.required], nonNullable: true }),
    description: new FormControl("", { nonNullable: false }),
    tags: new FormControl([] as string[], { nonNullable: true }),
  });

  protected create(): void {
    if (this.form.invalid) {
      throw Error("Invalid exercise form");
    }

    this.loading.set(true);
    const values = this.form.value;

    this.workoutsService.createWorkout$(values as NewWorkout).subscribe({
      next: (newWorkout) => {
        this.form.reset();
        this.close(newWorkout);
      },
      error: () => {},
      complete: () => {
        this.loading.set(false);
      },
    });
  }
}
