import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { SetItem } from "../../../../../../../../../../types/workouts/sets";

@Component({
  selector: "app-workout-builder-set-item",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./workout-builder-set-item.component.html",
  styleUrl: "./workout-builder-set-item.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkoutBuilderSetItemComponent {
  public setItem = input<SetItem>();
}
