import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-exercise-details-drawer",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./exercise-details-drawer.component.html",
  styleUrl: "./exercise-details-drawer.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExerciseDetailsDrawerComponent {}
