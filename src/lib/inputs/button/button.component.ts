import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
  inject,
  input,
} from "@angular/core";
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
  private readonly renderer2 = inject(Renderer2);

  @ViewChild("button") button!: ElementRef<HTMLButtonElement>;

  public color = input<"primary" | "secondary" | "clean">("primary");
  public variant = input<"filled" | "outlined">("filled");
  public type = input<"submit" | "button">("button");
  public shape = input<"regular" | "circle">("regular");
  public loading = input<boolean, boolean>(false, {
    transform: (value) => {
      if (!this.button) {
        return value;
      }

      if (value) {
        this.renderer2.setStyle(
          this.button.nativeElement,
          "width",
          `${this.button.nativeElement.getBoundingClientRect().width}px`
        );
      } else {
        this.renderer2.removeStyle(this.button.nativeElement, "width");
      }

      return value;
    },
  });
  public disabled = input(false);
}
