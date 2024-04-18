import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, input } from "@angular/core";

type SpinnerSizes = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

@Component({
  selector: "lib-spinner",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./spinner.component.html",
  styleUrl: "./spinner.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent {
  public size = input<SpinnerSizes>("xs");
}
