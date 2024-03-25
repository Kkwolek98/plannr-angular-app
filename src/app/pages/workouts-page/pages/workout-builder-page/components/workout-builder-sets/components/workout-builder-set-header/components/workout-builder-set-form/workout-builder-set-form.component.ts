import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output, inject, input } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ButtonComponent } from "../../../../../../../../../../../lib/inputs/button/button.component";
import { InputComponent } from "../../../../../../../../../../../lib/inputs/input/input.component";
import { SelectComponent } from "../../../../../../../../../../../lib/inputs/select/select.component";
import { ToggleComponent } from "../../../../../../../../../../../lib/inputs/toggle/toggle.component";
import { ExercisesService } from "../../../../../../../../../../services/exercises.service";
import { WorkoutBuilderService } from "../../../../../../../../../../services/workout-builder.service";
import { NewSetItemForm } from "../../../../../../../../../../types/workout-builder/exercise";
import { ExerciseSet, SetItem } from "../../../../../../../../../../types/workouts/sets";
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
export class WorkoutBuilderSetFormComponent implements OnInit {
  private readonly exercisesService = inject(ExercisesService);
  private readonly workoutBuilder = inject(WorkoutBuilderService);

  public setId = input.required<string>();
  public editedSetItem = input<SetItem>();

  private previousLoad?: number | null;

  @Output()
  closed: EventEmitter<void> = new EventEmitter();

  exercises = toSignal(this.exercisesService.getAllExercises$());

  form: FormGroup<NewSetItemForm> = new FormGroup<NewSetItemForm>({
    details: new FormControl("", { nonNullable: true }),
    repMin: new FormControl(null),
    repMax: new FormControl(null),
    repExact: new FormControl(null),
    repType: new FormControl("kg", { nonNullable: true }),
    repWeight: new FormControl(null),
    sort: new FormControl(0, { nonNullable: true }),
    rest: new FormControl(null),
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

  ngOnInit(): void {
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

    this.workoutBuilder.addSetItemToSet(this.setId(), this.form.value as Partial<ExerciseSet>).subscribe({
      next: () => {
        this.closed.emit();
      },
    });
  }
}
