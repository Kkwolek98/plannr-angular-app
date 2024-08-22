import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, input, signal, viewChild } from "@angular/core";
import { DrawerDirective } from "@shared/drawer/drawer.directive";
import { DrawerContainerComponent } from "../../../../../../../shared/src/lib/drawer/drawer-container/drawer-container.component";
import { ButtonComponent } from "../../../../../../../shared/src/lib/inputs/button/button.component";
import { TableColumnDirective } from "../../../../../../../shared/src/lib/table/directives/table-column.directive";
import { TableComponent } from "../../../../../../../shared/src/lib/table/table.component";
import { Exercise } from "../../../../../../../shared/src/lib/types/exercises/exercises";
import { ExerciseDetailsDrawerComponent } from "../exercise-details-drawer/exercise-details-drawer.component";

@Component({
  selector: "app-exercises-table",
  standalone: true,
  templateUrl: "./exercises-table.component.html",
  styleUrl: "./exercises-table.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    DrawerDirective,
    TableComponent,
    TableColumnDirective,
    ButtonComponent,
    DrawerContainerComponent,
    ExerciseDetailsDrawerComponent,
  ],
})
export class ExercisesTableComponent {
  readonly data = input<Exercise[]>();

  drawerContainer = viewChild<DrawerContainerComponent>("drawerContainer");

  drawerData = signal<Exercise | null>(null);

  toggleDrawer(row: Exercise): void {
    if (this.drawerData()?.id === row.id) {
      this.drawerData.set(null);
      this.drawerContainer()?.close();
    } else {
      this.drawerData.set(row);
      this.drawerContainer()?.open();
    }
  }

  closeDrawer(): void {
    this.drawerContainer()?.close();
    setTimeout(() => {
      this.drawerData.set(null);
    }, 300);
  }
}
