import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { ActivatedRoute, RouterOutlet } from "@angular/router";
import { map } from "rxjs";
import { ButtonComponent } from "../../components/inputs/button/button.component";
import { Exercise } from "../../types/exercises/exercises";
import { ExercisesTableComponent } from "./components/exercises-table/exercises-table.component";

@Component({
  selector: "app-exercises-page",
  standalone: true,
  templateUrl: "./exercises-page.component.html",
  styleUrl: "./exercises-page.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExercisesTableComponent, CommonModule, RouterOutlet, ButtonComponent],
})
export class ExercisesPageComponent {
  readonly route = inject(ActivatedRoute);
  readonly exercises = toSignal<Exercise[]>(
    this.route.data.pipe(map((data) => data["exercises"] as Exercise[]))
  );
}
