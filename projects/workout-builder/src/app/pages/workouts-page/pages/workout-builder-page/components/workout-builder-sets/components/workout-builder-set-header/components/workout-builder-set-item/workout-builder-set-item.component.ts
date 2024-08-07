import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from "@angular/core";
import { ButtonComponent } from "../../../../../../../../../../../../../shared/src/lib/inputs/button/button.component";
import { SetItem } from "../../../../../../../../../../../../../shared/src/lib/types/workouts/sets";
import { WorkoutBuilderService } from "../../../../../../../../../../services/workout-builder.service";

@Component({
  selector: "app-workout-builder-set-item",
  standalone: true,
  templateUrl: "./workout-builder-set-item.component.html",
  styleUrl: "./workout-builder-set-item.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ButtonComponent],
})
export class WorkoutBuilderSetItemComponent {
  private readonly workoutBuilderService = inject(WorkoutBuilderService);

  public index = input.required<number>();
  public setItem = input.required<SetItem>();

  isRemovingSet = signal<boolean>(false);

  hasRepRange = computed(() => {
    return this.setItem().repMin !== null && this.setItem().repMax !== null;
  });

  hasLoad = computed(() => {
    return this.setItem().repWeight !== null;
  });

  removeItem(): void {
    this.isRemovingSet.set(true);
    this.workoutBuilderService.removeSetItem(this.setItem().id).subscribe({
      complete: () => {
        this.isRemovingSet.set(false);
      },
    });
  }

  enableEdit(): void {
    this.workoutBuilderService.setItemId(this.setItem().id);
  }
}
