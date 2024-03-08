import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs";
import { ButtonComponent } from "../../components/inputs/button/button.component";
import { Workout } from "../../types/workouts/workouts";
import { WorkoutsTableComponent } from "./components/workouts-table/workouts-table.component";

@Component({
  selector: "app-workouts-page",
  standalone: true,
  templateUrl: "./workouts-page.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ButtonComponent, WorkoutsTableComponent],
})
export class WorkoutsPageComponent {
  readonly route = inject(ActivatedRoute);
  readonly workouts = toSignal<Workout[]>(this.route.data.pipe(map((data) => data["workouts"] as Workout[])));
}
