import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ButtonComponent } from "../../../../../lib/inputs/button/button.component";
import { InputComponent } from "../../../../../lib/inputs/input/input.component";
import { ModalComponent } from "../../../../../lib/modals/components/modal/modal.component";
import { ExercisesService } from "../../../../services/exercises.service";
import { NewExerciseForm } from "../../../../types/exercises/exercises";
import { youtubeUrlValidator } from "../../../../validators/youtube-url.validator";

@Component({
  selector: "app-new-exercise-modal",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputComponent, ButtonComponent],
  templateUrl: "./new-exercise-modal.component.html",
  styleUrl: "./new-exercise-modal.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewExerciseModalComponent extends ModalComponent<undefined, boolean> {
  private readonly exercisesService = inject(ExercisesService);

  protected form: FormGroup<NewExerciseForm> = new FormGroup({
    name: new FormControl("", { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl(""),
    videos: new FormControl([] as string[], { nonNullable: true }),
    tags: new FormControl([] as string[], { nonNullable: true }),
  });

  protected newVideoFormControl: FormControl<string> = new FormControl("", {
    nonNullable: true,
    validators: [Validators.required, youtubeUrlValidator],
  });

  protected addVideoToArray(): void {
    if (this.newVideoFormControl.invalid) {
      throw Error("Invalid video url");
    }

    this.form.get("videos")?.value.push(this.newVideoFormControl.value);
    this.newVideoFormControl.reset();
  }

  protected create(): void {
    if (this.form.invalid) {
      throw Error("Invalid exercise form");
    }

    const values = this.form.value;

    this.exercisesService.createExercise$(values as Required<typeof values>).subscribe({
      next: () => {
        this.form.reset();
        this.close(true);
      },
      error: () => {},
      complete: () => {},
    });
  }
}
