import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, input } from "@angular/core";
import { Router } from "@angular/router";
import { ButtonComponent } from "../../../../../../../shared/src/lib/inputs/button/button.component";
import { TableColumnDirective } from "../../../../../../../shared/src/lib/table/directives/table-column.directive";
import { TableComponent } from "../../../../../../../shared/src/lib/table/table.component";
import { WorkoutTemplate } from "../../../../../../../shared/src/lib/types/workouts/workout-template";

@Component({
  selector: "app-workouts-table",
  standalone: true,
  imports: [CommonModule, TableComponent, TableColumnDirective, ButtonComponent],
  templateUrl: "./workouts-table.component.html",
  styleUrl: "./workouts-table.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkoutsTableComponent {
  private readonly router = inject(Router);

  readonly data = input<WorkoutTemplate[]>();

  goToWorkout(id: string) {
    this.router.navigate(["workout-templates", id]);
  }
}
