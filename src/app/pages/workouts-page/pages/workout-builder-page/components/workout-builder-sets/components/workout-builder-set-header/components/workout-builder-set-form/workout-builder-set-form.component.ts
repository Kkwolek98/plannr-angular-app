import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, EventEmitter, Output, inject, input } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { ButtonComponent } from "../../../../../../../../../../../lib/inputs/button/button.component";
import { InputComponent } from "../../../../../../../../../../../lib/inputs/input/input.component";
import { SelectComponent } from "../../../../../../../../../../../lib/inputs/select/select.component";
import { ToggleComponent } from "../../../../../../../../../../../lib/inputs/toggle/toggle.component";
import { ExercisesService } from "../../../../../../../../../../services/exercises.service";
import { WorkoutBuilderService } from "../../../../../../../../../../services/workout-builder.service";
import { NewSetItemForm } from "../../../../../../../../../../types/workout-builder/exercise";
import { SetItem } from "../../../../../../../../../../types/workouts/sets";
import { REP_TYPES_SELECT } from "../../../../../../../../../../utils/consts/rep-types";

type FormFlow = {
  isExactReps: FormControl<boolean>;
  hasLoad: FormControl<boolean>;
  hasRest: FormControl<boolean>;
};

@Component({
  selector: "app-workout-builder-set-form",
  standalone: true,
  templateUrl: "./workout-builder-set-form.component.html",
  styleUrl: "./workout-builder-set-form.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    InputComponent,
    FormsModule,
    ReactiveFormsModule,
    SelectComponent,
    ButtonComponent,
    ToggleComponent,
  ],
})
export class WorkoutBuilderSetFormComponent {
  private readonly exercisesService = inject(ExercisesService);
  private readonly workoutBuilder = inject(WorkoutBuilderService);

  public setId = input.required<string>();
  public editedSetItem = input<SetItem | null, SetItem | null>(null, {
    transform: (val) => {
      if (val) {
        this.formFlow.setValue({
          isExactReps: val.repExact !== null,
          hasLoad: val.repWeight !== null,
          hasRest: val.rest !== null,
        });

        this.form.setValue({
          details: val.details.id,
          repMin: val.repMin!,
          repMax: val.repMax!,
          repExact: val.repExact!,
          repType: val.repType!,
          repWeight: val.repWeight!,
          sort: val.sort!,
          rest: val.rest!,
        });
      }
      return val;
    },
  });

  private previousLoad?: number | null;

  @Output()
  closed: EventEmitter<void> = new EventEmitter();

  exercises = toSignal(this.exercisesService.getAllExercises$());

  form: FormGroup<NewSetItemForm> = new FormGroup<NewSetItemForm>({
    details: new FormControl("", { nonNullable: true }),
    repMin: new FormControl(null, { validators: [Validators.min(0)] }),
    repMax: new FormControl(null, { validators: [Validators.min(1)] }),
    repExact: new FormControl(null, { validators: [Validators.min(1)] }),
    repType: new FormControl("kg", { nonNullable: true }),
    repWeight: new FormControl(null, { validators: [Validators.min(0)] }),
    sort: new FormControl(0, { nonNullable: true }),
    rest: new FormControl(null, { validators: [Validators.min(0)] }),
  });

  formFlow: FormGroup<FormFlow> = new FormGroup({
    isExactReps: new FormControl(false, { nonNullable: true }),
    hasLoad: new FormControl(true, { nonNullable: true }),
    hasRest: new FormControl(true, { nonNullable: true }),
  });

  repTypes = REP_TYPES_SELECT;

  get isExactRepsControl(): FormControl<boolean> {
    return this.formFlow.get("isExactReps") as FormControl<boolean>;
  }

  get hasRestControl(): FormControl<boolean> {
    return this.formFlow.get("hasRest") as FormControl<boolean>;
  }

  get hasLoadControl(): FormControl<boolean> {
    return this.formFlow.get("hasLoad") as FormControl<boolean>;
  }

  constructor() {
    this.hasLoadControl.valueChanges.subscribe((hasLoad) => {
      const repWeightControl = this.form.get("repWeight");
      const repTypeControl = this.form.get("repType");
      if (!hasLoad) {
        this.previousLoad = repWeightControl?.value;
        repWeightControl?.setValue(null);
        repWeightControl?.disable();
        repTypeControl?.disable();
      } else {
        repWeightControl?.setValue(this.previousLoad!);
        repWeightControl?.enable();
        repTypeControl?.enable();
      }
    });
  }

  save() {
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }

    if (this.editedSetItem()) {
      this.saveEdited();
    } else {
      this.saveNew();
    }
  }

  private saveNew(): void {
    this.workoutBuilder.addSetItemToSet(this.setId(), this.form.value as Partial<SetItem>).subscribe({
      next: () => {
        this.closed.emit();
      },
    });
  }

  private saveEdited(): void {
    this.workoutBuilder.updateSetItem(this.editedSetItem()!.id, this.form.value as Partial<SetItem>).subscribe({
      next: () => {
        this.workoutBuilder.setItemId(null);
      },
    });
  }
}
