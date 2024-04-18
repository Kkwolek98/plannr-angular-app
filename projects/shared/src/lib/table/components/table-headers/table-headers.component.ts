import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { TableService } from "../../services/table.service";

@Component({
  selector: "lib-table-headers",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./table-headers.component.html",
  styleUrl: "./table-headers.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableHeadersComponent {
  private readonly tableService = inject(TableService);

  protected columns = this.tableService.columns;
  protected cardBreakpoint = this.tableService.cardBreakpoint;
}
