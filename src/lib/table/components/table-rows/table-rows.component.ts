import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { TableService } from "../../services/table.service";

@Component({
  selector: "app-table-rows",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./table-rows.component.html",
  styleUrl: "./table-rows.component.scss",
  changeDetection: ChangeDetectionStrategy.Default,
})
export class TableRowsComponent {
  private readonly tableService = inject(TableService);
  protected rowClick = this.tableService.rowClick;
  protected data = this.tableService.data;
  protected columns = this.tableService.columns;
  protected cardBreakpoint = this.tableService.cardBreakpoint;
}
