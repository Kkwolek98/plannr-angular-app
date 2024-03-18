import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, signal } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ButtonComponent } from "../../../../../lib/inputs/button/button.component";
import { InputComponent } from "../../../../../lib/inputs/input/input.component";
import { ModalComponent } from "../../../../../lib/modals/components/modal/modal.component";
import { WorkoutsService } from "../../../../services/workouts.service";
import { NewWorkout, NewWorkoutForm, Workout } from "../../../../types/workouts/workouts";

@Component({
  selector: "app-new-workout-modal",
  standalone: true,
  templateUrl: "./new-workout-modal.component.html",
  styleUrl: "./new-workout-modal.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, InputComponent, ReactiveFormsModule, ButtonComponent],
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
