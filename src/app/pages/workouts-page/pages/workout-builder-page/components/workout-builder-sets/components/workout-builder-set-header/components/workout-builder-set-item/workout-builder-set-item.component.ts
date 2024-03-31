import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, computed, input } from "@angular/core";
import { ButtonComponent } from "../../../../../../../../../../../lib/inputs/button/button.component";
import { SetItem } from "../../../../../../../../../../types/workouts/sets";

@Component({
  selector: "app-workout-builder-set-item",
  standalone: true,
  templateUrl: "./workout-builder-set-item.component.html",
  styleUrl: "./workout-builder-set-item.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ButtonComponent],
})
export class WorkoutBuilderSetItemComponent {
  public index = input.required<number>();
  public setItem = input.required<SetItem>();

  hasRepRange = computed(() => {
    return this.setItem().repMin !== null && this.setItem().repMax !== null;
  });

  hasLoad = computed(() => {
    return this.setItem().repWeight !== null;
  });
}
