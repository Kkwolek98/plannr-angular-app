import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { ActivatedRoute, Router } from "@angular/router";
import { map } from "rxjs";
import { ButtonComponent } from "../../../../../shared/src/lib/inputs/button/button.component";
import { ModalsService } from "../../../../../shared/src/lib/modals/services/modals.service";
import { Workout } from "../../types/workouts/workouts";
import { NewWorkoutModalComponent } from "./components/new-workout-modal/new-workout-modal.component";
import { WorkoutsTableComponent } from "./components/workouts-table/workouts-table.component";

@Component({
  selector: "app-workouts-page",
  standalone: true,
  templateUrl: "./workouts-page.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ButtonComponent, WorkoutsTableComponent],
})
export class WorkoutsPageComponent {
  readonly route = inject(ActivatedRoute);
  private readonly modalsService = inject(ModalsService);
  private readonly router = inject(Router);

  readonly workouts = toSignal<Workout[]>(this.route.data.pipe(map((data) => data["workouts"] as Workout[])));

  openNewWorkoutModal(): void {
    const modal = this.modalsService.newModal(NewWorkoutModalComponent, {
      title: "Create new workout",
    });
    modal.closed$.subscribe({
      next: (newWorkout) => {
        if (!newWorkout) {
          return;
        }

        this.router.navigate([`/workouts/${newWorkout.id}`]);
      },
    });
  }
}
