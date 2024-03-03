import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { TableColumnDirective } from "../../../../../../components/table/directives/table-column.directive";
import { TableComponent } from "../../../../../../components/table/table.component";
import { Exercise } from "../../../../../../types/exercises/exercises";

@Component({
  selector: "app-exercises-table",
  standalone: true,
  templateUrl: "./exercises-table.component.html",
  styleUrl: "./exercises-table.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TableComponent, TableColumnDirective],
})
export class ExercisesTableComponent {
  readonly data = input<Exercise[]>();
}
