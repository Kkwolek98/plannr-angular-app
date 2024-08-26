import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { ActivatedRoute, Router } from "@angular/router";
import { map } from "rxjs";
import { ButtonComponent } from "../../../../../shared/src/lib/inputs/button/button.component";
import { ModalsService } from "../../../../../shared/src/lib/modals/services/modals.service";
import { WorkoutTemplate } from "../../../../../shared/src/lib/types/workouts/workout-template";
import { NewWorkoutModalComponent } from "./components/new-workout-modal/new-workout-modal.component";
import { WorkoutsTableComponent } from "./components/workouts-table/workouts-table.component";

@Component({
  selector: "app-workout-templates-page",
  standalone: true,
  templateUrl: "./workout-templates-page.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ButtonComponent, WorkoutsTableComponent],
})
export class WorkoutTemplatesPageComponent {
  readonly route = inject(ActivatedRoute);
  private readonly modalsService = inject(ModalsService);
  private readonly router = inject(Router);

  readonly workouts = toSignal<WorkoutTemplate[]>(
    this.route.data.pipe(map((data) => data["workouts"] as WorkoutTemplate[]))
  );

  openNewWorkoutModal(): void {
    const modal = this.modalsService.newModal(NewWorkoutModalComponent, {
      title: "Create new workout",
    });
    modal.closed$.subscribe({
      next: (newWorkout) => {
        if (!newWorkout) {
          return;
        }

        this.router.navigate([`/workout-templates/${newWorkout.id}`]);
      },
    });
  }
}
