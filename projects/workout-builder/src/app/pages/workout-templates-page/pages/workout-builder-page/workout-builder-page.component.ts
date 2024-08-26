import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit, Signal, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { ActivatedRoute, Router } from "@angular/router";
import { map } from "rxjs";
import { ButtonComponent } from "../../../../../../../shared/src/lib/inputs/button/button.component";
import { WorkoutTab } from "../../../../../../../shared/src/lib/types/workouts/workout-builder";
import { WorkoutTemplate } from "../../../../../../../shared/src/lib/types/workouts/workout-template";
import { WorkoutBuilderService } from "../../../../services/workout-builder.service";
import { WorkoutBuilderDetailsComponent } from "./components/workout-builder-details/workout-builder-details.component";
import { WorkoutBuilderPreviewComponent } from "./components/workout-builder-preview/workout-builder-preview.component";
import { WorkoutBuilderSetsComponent } from "./components/workout-builder-sets/workout-builder-sets.component";

@Component({
  selector: "app-workout-builder-page",
  standalone: true,
  templateUrl: "./workout-builder-page.component.html",
  styleUrl: "./workout-builder-page.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ButtonComponent,
    WorkoutBuilderSetsComponent,
    WorkoutBuilderDetailsComponent,
    WorkoutBuilderPreviewComponent,
  ],
})
export class WorkoutBuilderPageComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly workoutBuilderService = inject(WorkoutBuilderService);

  readonly workoutData = toSignal(
    this.activatedRoute.data.pipe(map((data) => data["workout"] as WorkoutTemplate))
  );
  data: Signal<WorkoutTemplate | undefined>;
  readonly activeTab = toSignal(
    this.activatedRoute.queryParams.pipe(map((queryParams) => queryParams["tab"] as string))
  );

  readonly WorkoutTab = WorkoutTab;

  constructor() {
    this.workoutBuilderService.setWorkout(this.workoutData()!);
    this.data = toSignal(this.workoutBuilderService.data);
  }

  ngOnInit(): void {
    if (!this.activeTab()) {
      this.router.navigate([], { queryParams: { tab: WorkoutTab.Sets } });
    }
  }

  changeTab(tab: WorkoutTab) {
    this.router.navigate([], { queryParams: { tab } });
  }
}
