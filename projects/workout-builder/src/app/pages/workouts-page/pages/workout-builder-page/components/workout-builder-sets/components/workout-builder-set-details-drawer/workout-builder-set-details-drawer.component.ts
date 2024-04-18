import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, EventEmitter, Output, inject, input, signal } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ButtonComponent } from "../../../../../../../../../../../shared/src/lib/inputs/button/button.component";
import { InputComponent } from "../../../../../../../../../../../shared/src/lib/inputs/input/input.component";
import { WorkoutBuilderService } from "../../../../../../../../services/workout-builder.service";
import { ExerciseSet, SetEditForm } from "../../../../../../../../types/workouts/sets";

@Component({
  selector: "app-workout-builder-set-details-drawer",
  standalone: true,
  templateUrl: "./workout-builder-set-details-drawer.component.html",
  styleUrl: "./workout-builder-set-details-drawer.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent, InputComponent],
})
export class WorkoutBuilderSetDetailsDrawerComponent {
  private readonly workoutBuilderService = inject(WorkoutBuilderService);

  public drawerData = input<ExerciseSet | null, ExerciseSet | null>(null, {
    transform: (val) => {
      this.isDeletingSet.set(false);
      this.isSavingChanges.set(false);
      this.isEditMode.set(false);

      return val;
    },
  });

  @Output()
  closeDrawer: EventEmitter<void> = new EventEmitter();

  isDeletingSet = signal<boolean>(false);
  isSavingChanges = signal<boolean>(false);
  isEditMode = signal<boolean>(false);

  editForm: FormGroup<SetEditForm> = new FormGroup<SetEditForm>({
    name: new FormControl<string>("", { nonNullable: true, validators: Validators.required }),
    description: new FormControl<string>("", { nonNullable: true }),
    rest: new FormControl<number>(0, { nonNullable: true, validators: Validators.min(0) }),
  });

  toggleEditMode(): void {
    this.isEditMode.set(!this.isEditMode());
    this.populateForm();
  }

  populateForm(): void {
    const data = this.drawerData();

    if (!data) {
      throw Error("No set data provided");
    }

    this.editForm.setValue({
      name: data.name,
      description: data.description,
      rest: data.rest ?? 0,
    });
  }

  saveChanges(): void {
    this.isSavingChanges.set(true);
    this.workoutBuilderService.updateSet(this.drawerData()!.id, this.editForm.value).subscribe({
      next: () => {
        this.toggleEditMode();
      },
      complete: () => {
        this.isSavingChanges.set(false);
      },
    });
  }

  removeSet(): void {
    this.isDeletingSet.set(true);
    this.workoutBuilderService.removeSet(this.drawerData()!.id).subscribe({
      next: () => {
        this.closeDrawer.emit();
      },
      complete: () => {
        this.isDeletingSet.set(false);
      },
    });
  }
}
