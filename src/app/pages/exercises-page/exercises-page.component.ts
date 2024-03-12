import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, signal } from "@angular/core";
import { ActivatedRoute, RouterOutlet } from "@angular/router";
import { map } from "rxjs";
import { ButtonComponent } from "../../../lib/inputs/button/button.component";
import { ModalsService } from "../../../lib/modals/services/modals.service";
import { ExercisesService } from "../../services/exercises.service";
import { Exercise } from "../../types/exercises/exercises";
import { ExercisesTableComponent } from "./components/exercises-table/exercises-table.component";
import { NewExerciseModalComponent } from "./components/new-exercise-modal/new-exercise-modal.component";

@Component({
  selector: "app-exercises-page",
  standalone: true,
  templateUrl: "./exercises-page.component.html",
  styleUrl: "./exercises-page.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExercisesTableComponent, CommonModule, RouterOutlet, ButtonComponent],
})
export class ExercisesPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly modalsService = inject(ModalsService);
  private readonly exercisesService = inject(ExercisesService);
  readonly exercises = signal<Exercise[]>([]);

  constructor() {
    this.route.data.pipe(map((data) => data["exercises"] as Exercise[])).subscribe({
      next: (val) => {
        this.exercises.set(val);
      },
    });
  }

  protected openNewExerciseModal(): void {
    const modal = this.modalsService.newModal(NewExerciseModalComponent, {
      title: "Create new exercise",
    });
    modal.closed$.subscribe({
      next: (saved) => {
        if (saved) {
          this.refetchData();
        }
      },
    });
    modal.open();
  }

  private refetchData(): void {
    this.exercisesService.getAllExercises$().subscribe((res) => {
      this.exercises.set(res);
    });
  }
}
