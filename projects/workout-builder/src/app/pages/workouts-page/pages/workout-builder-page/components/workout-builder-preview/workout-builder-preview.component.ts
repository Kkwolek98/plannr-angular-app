import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { WorkoutDisplayComponent } from "@client-components/workout-display/workout-display.component";
import { ButtonComponent } from "@shared/inputs/button/button.component";

@Component({
  selector: "app-workout-builder-preview",
  standalone: true,
  imports: [CommonModule, ButtonComponent, WorkoutDisplayComponent],
  templateUrl: "./workout-builder-preview.component.html",
  styleUrl: "./workout-builder-preview.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkoutBuilderPreviewComponent {}
