import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, input } from "@angular/core";

@Component({
  selector: "app-button",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./button.component.html",
  styleUrl: "./button.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  public color = input<"primary" | "secondary" | "clean">("primary");
  public variant = input<"filled" | "outlined">("filled");
  public type = input<"submit" | "button">("button");
  public shape = input<"regular" | "circle">("regular");
}
