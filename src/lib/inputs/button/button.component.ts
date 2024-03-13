import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { SpinnerComponent } from "../../spinner/spinner.component";

@Component({
  selector: "app-button",
  standalone: true,
  templateUrl: "./button.component.html",
  styleUrl: "./button.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, SpinnerComponent],
})
export class ButtonComponent {
  public color = input<"primary" | "secondary" | "clean">("primary");
  public variant = input<"filled" | "outlined">("filled");
  public type = input<"submit" | "button">("button");
  public shape = input<"regular" | "circle">("regular");
  public loading = input(false);
  public disabled = input(false);
}
