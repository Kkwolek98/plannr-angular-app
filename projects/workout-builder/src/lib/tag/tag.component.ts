import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, EventEmitter, Output, input } from "@angular/core";

@Component({
  selector: "app-tag",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./tag.component.html",
  styleUrl: "./tag.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagComponent {
  public color = input<"primary" | "secondary">("secondary");
  @Output() badgeClicked: EventEmitter<void> = new EventEmitter();
}
