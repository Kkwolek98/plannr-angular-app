import { LayoutComponent } from '../../components/layout/layout.component'
import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-exercises-page",
  standalone: true,
  imports: [LayoutComponent, CommonModule, RouterOutlet],
  templateUrl: "./exercises-page.component.html",
  styleUrl: "./exercises-page.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExercisesPageComponent {}
