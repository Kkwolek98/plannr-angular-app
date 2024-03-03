import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-exercises-page",
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: "./exercises-page.component.html",
  styleUrl: "./exercises-page.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExercisesPageComponent {}
