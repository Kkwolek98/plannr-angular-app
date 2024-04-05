import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, EventEmitter, Output, inject, input, signal } from "@angular/core";
import { ButtonComponent } from "../../../../../../../../../lib/inputs/button/button.component";
import { WorkoutBuilderService } from "../../../../../../../../services/workout-builder.service";
import { ExerciseSet } from "../../../../../../../../types/workouts/sets";

@Component({
  selector: "app-workout-builder-set-details-drawer",
  standalone: true,
  templateUrl: "./workout-builder-set-details-drawer.component.html",
  styleUrl: "./workout-builder-set-details-drawer.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ButtonComponent],
})
export class WorkoutBuilderSetDetailsDrawerComponent {
  private readonly workoutBuilderService = inject(WorkoutBuilderService);

  public drawerData = input<ExerciseSet | null>(null);

  @Output()
  closeDrawer: EventEmitter<void> = new EventEmitter();

  deletingSet = signal<boolean>(false);

  removeSet(): void {
    this.deletingSet.set(true);
    this.workoutBuilderService.removeSet(this.drawerData()!.id).subscribe({
      next: () => {
        this.closeDrawer.emit();
      },
      complete: () => {
        this.deletingSet.set(false);
      },
    });
  }
}
