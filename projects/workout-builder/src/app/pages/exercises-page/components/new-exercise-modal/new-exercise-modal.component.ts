import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, signal } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ButtonComponent } from "../../../../../../../shared/src/lib/inputs/button/button.component";
import { InputComponent } from "../../../../../../../shared/src/lib/inputs/input/input.component";
import { TagInputComponent } from "../../../../../../../shared/src/lib/inputs/tag-input/tag-input.component";
import { ModalComponent } from "../../../../../../../shared/src/lib/modals/components/modal/modal.component";
import { TagComponent } from "../../../../../../../shared/src/lib/tag/tag.component";
import { NewExerciseForm } from "../../../../../../../shared/src/lib/types/exercises/exercises";
import { YoutubeVideoComponent } from "../../../../../../../shared/src/lib/youtube-video/youtube-video.component";
import { ExercisesService } from "../../../../services/exercises.service";
import { youtubeUrlValidator } from "../../../../validators/youtube-url.validator";

@Component({
  selector: "app-new-exercise-modal",
  standalone: true,
  templateUrl: "./new-exercise-modal.component.html",
  styleUrl: "./new-exercise-modal.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputComponent,
    ButtonComponent,
    TagComponent,
    YoutubeVideoComponent,
    TagInputComponent,
  ],
})
export class NewExerciseModalComponent extends ModalComponent<undefined, boolean> {
  private readonly exercisesService = inject(ExercisesService);

  public loading = signal(false);

  protected form: FormGroup<NewExerciseForm> = new FormGroup({
    name: new FormControl("", { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl(""),
    videos: new FormControl([] as string[], { nonNullable: true }),
    tags: new FormControl([] as string[], { nonNullable: true }),
  });

  protected newVideoFormControl: FormControl<string> = new FormControl("", {
    nonNullable: true,
    validators: [youtubeUrlValidator],
  });

  protected addVideoToArray(): void {
    if (this.newVideoFormControl.invalid) {
      throw Error("Invalid video url");
    }

    this.form.get("videos")?.value.push(this.newVideoFormControl.value);
    this.newVideoFormControl.setValue("");
  }

  protected create(): void {
    if (this.form.invalid) {
      throw Error("Invalid exercise form");
    }

    this.loading.set(true);
    const values = this.form.value;

    this.exercisesService.createExercise$(values as Required<typeof values>).subscribe({
      next: () => {
        this.form.reset();
        this.close(true);
      },
      error: () => {},
      complete: () => {
        this.loading.set(false);
      },
    });
  }
}
