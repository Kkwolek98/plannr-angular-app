import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { map } from "rxjs";
import { ButtonComponent } from "../../../../../../../lib/inputs/button/button.component";
import { WorkoutBuilderService } from "../../../../../../services/workout-builder.service";
import { WorkoutBuilderSetBodyComponent } from "./components/workout-builder-set-body/workout-builder-set-body.component";
import { WorkoutBuilderSetContainerComponent } from "./components/workout-builder-set-container/workout-builder-set-container.component";
import { WorkoutBuilderSetHeaderComponent } from "./components/workout-builder-set-header/workout-builder-set-header.component";

@Component({
  selector: "app-workout-builder-sets",
  standalone: true,
  templateUrl: "./workout-builder-sets.component.html",
  styleUrl: "./workout-builder-sets.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    WorkoutBuilderSetContainerComponent,
    WorkoutBuilderSetHeaderComponent,
    WorkoutBuilderSetBodyComponent,
    ButtonComponent,
  ],
})
export class WorkoutBuilderSetsComponent {
  readonly workoutBuilderService = inject(WorkoutBuilderService);
  readonly sets = toSignal(this.workoutBuilderService.data.pipe(map((workout) => workout?.sets || [])));

  public addNewSet(): void {
    this.workoutBuilderService.addEmptySet().subscribe();
  }
}
