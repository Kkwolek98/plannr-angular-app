import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit, inject } from "@angular/core";
import { TableService } from "../../services/table.service";

@Component({
  selector: "app-table-rows",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./table-rows.component.html",
  styleUrl: "./table-rows.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableRowsComponent implements OnInit {
  private readonly tableService = inject(TableService);
  protected rowClick = this.tableService.rowClick;
  protected data = this.tableService.data;
  protected columns = this.tableService.columns;

  ngOnInit(): void {
    console.log(this.tableService);
  }
}
