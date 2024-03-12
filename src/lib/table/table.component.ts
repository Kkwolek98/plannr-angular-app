import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  EventEmitter,
  Output,
  QueryList,
  input,
} from "@angular/core";
import { TableColumnDirective } from "./directives/table-column.directive";

@Component({
  selector: "app-table",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./table.component.html",
  styleUrl: "./table.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent<T extends []> {
  data = input.required<T>();
  @Output() rowClick = new EventEmitter<{ event: MouseEvent; row: T }>();

  @ContentChildren(TableColumnDirective) columns: QueryList<TableColumnDirective> =
    new QueryList<TableColumnDirective>();
}
