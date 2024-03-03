import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { ActivatedRoute, RouterOutlet } from "@angular/router";
import { map } from "rxjs";
import { Exercise } from "../../../../types/exercises/exercises";
import { ExercisesTableComponent } from "./components/exercises-table/exercises-table.component";

@Component({
  selector: "app-exercises",
  standalone: true,
  imports: [ExercisesTableComponent, CommonModule, RouterOutlet],
  providers: [],
  templateUrl: "./exercises.component.html",
  styleUrl: "./exercises.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExercisesComponent {
  readonly route = inject(ActivatedRoute);
  readonly exercises = toSignal<Exercise[]>(
    this.route.data.pipe(map((data) => data["exercises"] as Exercise[]))
  );
}
