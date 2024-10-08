import { CommonModule } from "@angular/common";
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
  inject,
  input,
} from "@angular/core";
import { TableHeadersComponent } from "./components/table-headers/table-headers.component";
import { TableRowsComponent } from "./components/table-rows/table-rows.component";
import { TableColumnDirective } from "./directives/table-column.directive";
import { TableService } from "./services/table.service";
import { CardBreakpoint } from "./types";

@Component({
  selector: "lib-table",
  standalone: true,
  templateUrl: "./table.component.html",
  styleUrl: "./table.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TableService],
  imports: [CommonModule, TableHeadersComponent, TableRowsComponent],
})
export class TableComponent<T extends unknown[]> implements AfterViewInit {
  public readonly tableService = inject(TableService<T>);
  /**
   * Table data
   */
  // public data: InputSignalWithTransform<T, T> = input.required<T, T>({
  //   transform: (val) => {
  //     this.tableService.data.set(val);
  //     return val;
  //   },
  // });

  @Input() set data(val: T) {
    this.tableService.data.set(val);
  }

  /**
   * Breakpoint at which table rows become cards
   *
   * `sm` width < 640px
   *
   * `md` width < 768px
   *
   * `lg` width < 1024px
   *
   * `xl` width < 1280px
   *
   * `2xl` width < 1536px
   *
   */
  public cardBreakpoint = input<CardBreakpoint, CardBreakpoint>(undefined, {
    transform: (val) => {
      this.tableService.cardBreakpoint.set(val);
      return val;
    },
  });

  @Output() rowClick = new EventEmitter<{ event: MouseEvent; row: T[number] }>();

  @ContentChildren(TableColumnDirective) columns: QueryList<TableColumnDirective<T[number]>> = new QueryList<
    TableColumnDirective<T[number]>
  >();

  constructor() {
    this.tableService.rowClick = this.rowClick;
  }

  ngAfterViewInit(): void {
    this.tableService.columns.set(this.columns);
  }
}
