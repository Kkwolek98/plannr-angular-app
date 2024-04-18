import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, ViewChild, inject, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { map } from "rxjs";
import { DrawerContainerComponent } from "../../../../../../../../../shared/src/lib/drawer/drawer-container/drawer-container.component";
import { DrawerDirective } from "../../../../../../../../../shared/src/lib/drawer/drawer.directive";
import { ButtonComponent } from "../../../../../../../../../shared/src/lib/inputs/button/button.component";
import { WorkoutBuilderService } from "../../../../../../services/workout-builder.service";
import { ExerciseSet } from "../../../../../../types/workouts/sets";
import { WorkoutBuilderSetBodyComponent } from "./components/workout-builder-set-body/workout-builder-set-body.component";
import { WorkoutBuilderSetContainerComponent } from "./components/workout-builder-set-container/workout-builder-set-container.component";
import { WorkoutBuilderSetDetailsDrawerComponent } from "./components/workout-builder-set-details-drawer/workout-builder-set-details-drawer.component";
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
    DrawerContainerComponent,
    DrawerDirective,
    WorkoutBuilderSetDetailsDrawerComponent,
  ],
})
export class WorkoutBuilderSetsComponent {
  readonly workoutBuilderService = inject(WorkoutBuilderService);
  readonly sets = toSignal(this.workoutBuilderService.data.pipe(map((workout) => workout?.sets || [])));

  @ViewChild("drawerContainer") drawerContainer!: DrawerContainerComponent;

  drawerData = signal<ExerciseSet | null>(null);

  addNewSet(): void {
    this.workoutBuilderService.addEmptySet().subscribe();
  }

  isOpen(setId: string): boolean {
    return this.workoutBuilderService.openSetsIds().has(setId);
  }

  toggleDrawer(set: ExerciseSet): void {
    if (!this.drawerData() || this.drawerData()?.id !== set.id) {
      this.drawerData.set(set);
      this.drawerContainer.open();
    } else if (this.drawerData()?.id === set.id) {
      this.drawerData.set(null);
      this.drawerContainer.close();
    }
  }
}
