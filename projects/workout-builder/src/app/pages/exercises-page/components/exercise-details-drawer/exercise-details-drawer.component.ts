import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, input, output } from "@angular/core";
import { ButtonComponent } from "@shared/inputs/button/button.component";
import { Exercise } from "@shared/types/exercises/exercises";
import { YoutubeVideoComponent } from "@shared/youtube-video/youtube-video.component";

@Component({
  selector: "app-exercise-details-drawer",
  standalone: true,
  imports: [CommonModule, ButtonComponent, YoutubeVideoComponent],
  templateUrl: "./exercise-details-drawer.component.html",
  styleUrl: "./exercise-details-drawer.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExerciseDetailsDrawerComponent {
  public drawerData = input<Exercise | null>();
  public closeDrawer = output<void>();
}
