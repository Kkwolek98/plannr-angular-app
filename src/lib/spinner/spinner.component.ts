import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, input } from "@angular/core";

type SpinnerSizes =
  | 0
  | 0.5
  | 1
  | 1.5
  | 2
  | 2.5
  | 3
  | 3.5
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 14
  | 16
  | 20
  | 24
  | 28
  | 32
  | 36
  | 40
  | 44
  | 48
  | 52
  | 56
  | 60
  | 64
  | 72
  | 80
  | 96;

@Component({
  selector: "app-spinner",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./spinner.component.html",
  styleUrl: "./spinner.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent {
  public size = input<SpinnerSizes>(3);
}
