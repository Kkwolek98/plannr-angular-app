import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, signal } from "@angular/core";
import { shortId } from "../../../utils/short-id";
import { Notification, NotificationConfig } from "../../types/types";
import { NotificationComponent } from "../notification/notification.component";

@Component({
  selector: "lib-notifications-container",
  standalone: true,
  templateUrl: "./notifications-container.component.html",
  styleUrl: "./notifications-container.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, NotificationComponent],
})
export class NotificationsContainerComponent {
  protected notifications = signal<Notification[]>([]);

  public openNotification(notificationConfig: NotificationConfig): void {
    const notification: Notification = {
      ...notificationConfig,
      duration: notificationConfig.duration ?? 3000,
      id: shortId("notification"),
    };

    this.notifications.set([...this.notifications(), notification]);

    setTimeout(() => {
      this.closeNotification(notification.id);
    }, notification.duration);
  }

  public closeNotification(id: string): void {
    this.notifications.set(this.notifications().filter((notification) => notification.id !== id));
  }
}
