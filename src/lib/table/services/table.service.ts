import { EventEmitter, Injectable, QueryList, signal } from "@angular/core";
import { TableColumnDirective } from "../directives/table-column.directive";
import { CardBreakpoint } from "../types";

@Injectable()
export class TableService<T extends []> {
  public cardBreakpoint = signal<CardBreakpoint>(undefined);
  public data = signal<T>([] as T);
  public columns = signal<QueryList<TableColumnDirective>>(new QueryList());
  public rowClick?: EventEmitter<{ event: MouseEvent; row: T }>;
}
