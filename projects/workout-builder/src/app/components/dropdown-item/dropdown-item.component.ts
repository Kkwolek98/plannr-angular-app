import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-dropdown-item",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./dropdown-item.component.html",
  styleUrl: "./dropdown-item.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownItemComponent {
  @Output() clicked: EventEmitter<void> = new EventEmitter();
}
