import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, ContentChild, input, signal } from "@angular/core";
import { DrawerDirective } from "../drawer.directive";

@Component({
  selector: "app-drawer-container",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./drawer-container.component.html",
  styleUrl: "./drawer-container.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerContainerComponent {
  public width = input<number | string>("300px");
  public initialOpenState = input(false);

  isOpen = signal(this.initialOpenState());

  @ContentChild(DrawerDirective) drawer!: DrawerDirective;

  open(): void {
    this.isOpen.set(true);
  }

  close(): void {
    this.isOpen.set(false);
  }

  toggle(): void {
    this.isOpen.set(!this.isOpen());
  }
}
