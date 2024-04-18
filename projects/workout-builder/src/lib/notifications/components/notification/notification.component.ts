import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, EventEmitter, Output, input } from "@angular/core";
import { Notification } from "../../types/types";

@Component({
  selector: "app-notification",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./notification.component.html",
  styleUrl: "./notification.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationComponent {
  public config = input.required<Notification>();

  @Output()
  closed: EventEmitter<void> = new EventEmitter<void>();

  close(): void {
    this.closed.emit();
  }
}
