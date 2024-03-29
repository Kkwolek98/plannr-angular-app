import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { ButtonComponent } from "../../../../../lib/inputs/button/button.component";
import { TableColumnDirective } from "../../../../../lib/table/directives/table-column.directive";
import { TableComponent } from "../../../../../lib/table/table.component";
import { Exercise } from "../../../../types/exercises/exercises";

@Component({
  selector: "app-exercises-table",
  standalone: true,
  templateUrl: "./exercises-table.component.html",
  styleUrl: "./exercises-table.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TableComponent, TableColumnDirective, ButtonComponent],
})
export class ExercisesTableComponent {
  readonly data = input<Exercise[]>();

  rowClicked(row: Exercise): void {
    console.log({ row });
  }
}
