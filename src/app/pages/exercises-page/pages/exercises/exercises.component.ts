import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-exercises",
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  providers: [],
  templateUrl: "./exercises.component.html",
  styleUrl: "./exercises.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExercisesComponent {}
