import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, WritableSignal, inject, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { WorkoutDisplayComponent } from "@client-components/workout-display/workout-display.component";
import { ButtonComponent } from "@shared/inputs/button/button.component";
import { SpinnerComponent } from "@shared/spinner/spinner.component";
import { WorkoutBuilderService } from "@workout-builder/app/services/workout-builder.service";

@Component({
  selector: "app-workout-builder-preview",
  standalone: true,
  imports: [CommonModule, ButtonComponent, WorkoutDisplayComponent, SpinnerComponent],
  templateUrl: "./workout-builder-preview.component.html",
  styleUrl: "./workout-builder-preview.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkoutBuilderPreviewComponent {
  private workoutBuilderService = inject(WorkoutBuilderService);

  workoutData = toSignal(this.workoutBuilderService.data);
  previewStyle: WritableSignal<"phone" | "tablet" | "full"> = signal("phone");

  setPreviewStyle(style: "phone" | "tablet" | "full"): void {
    this.previewStyle.set(style);
  }
}
