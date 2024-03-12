import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { ButtonComponent } from "../../../../../lib/inputs/button/button.component";
import { TableColumnDirective } from "../../../../../lib/table/directives/table-column.directive";
import { TableComponent } from "../../../../../lib/table/table.component";
import { Workout } from "../../../../types/workouts/workouts";

@Component({
  selector: "app-workouts-table",
  standalone: true,
  imports: [CommonModule, TableComponent, TableColumnDirective, ButtonComponent],
  templateUrl: "./workouts-table.component.html",
  styleUrl: "./workouts-table.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkoutsTableComponent {
  readonly data = input<Workout[]>();
}
