import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { ActivatedRoute, Router } from "@angular/router";
import { map } from "rxjs";
import { ButtonComponent } from "../../../../../lib/inputs/button/button.component";
import { WorkoutBuilderService } from "../../../../services/workout-builder.service";
import { WorkoutTab } from "../../../../types/workouts/workout-builder";
import { Workout } from "../../../../types/workouts/workouts";
import { WorkoutBuilderSetsComponent } from "./components/workout-builder-sets/workout-builder-sets.component";

@Component({
  selector: "app-workout-builder-page",
  standalone: true,
  templateUrl: "./workout-builder-page.component.html",
  styleUrl: "./workout-builder-page.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ButtonComponent, WorkoutBuilderSetsComponent],
})
export class WorkoutBuilderPageComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly workoutBuilderService = inject(WorkoutBuilderService);

  readonly workoutData = toSignal(this.activatedRoute.data.pipe(map((data) => data["workout"] as Workout)));
  readonly activeTab = toSignal(
    this.activatedRoute.queryParams.pipe(map((queryParams) => queryParams["tab"] as string))
  );

  readonly WorkoutTab = WorkoutTab;

  ngOnInit(): void {
    if (!this.activeTab()) {
      this.router.navigate([], { queryParams: { tab: WorkoutTab.Sets } });
    }

    this.workoutBuilderService.setWorkout(this.workoutData()!);
  }

  changeTab(tab: WorkoutTab) {
    this.router.navigate([], { queryParams: { tab } });
  }
}
