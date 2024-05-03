import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, signal } from "@angular/core";
import { WorkoutDisplayService } from "@client-components/workout-display/services/workout-display.service";
import { ButtonComponent } from "@shared/inputs/button/button.component";

@Component({
  selector: "lib-workout-display-set-picker",
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: "./workout-display-set-picker.component.html",
  styleUrl: "./workout-display-set-picker.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkoutDisplaySetPickerComponent {
  private workoutDisplayService = inject(WorkoutDisplayService);

  data = this.workoutDisplayService.data;
  currentSetId = this.workoutDisplayService.currentSetId;
  isExpanded = signal(false);

  setCurrentSetId(id: string): void {
    this.workoutDisplayService.setCurrentSetId(id);
  }
}
