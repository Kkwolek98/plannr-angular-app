import { Injectable, inject } from "@angular/core";
import { NotificationConfig } from "../types/types";
import { NotificationCreationService } from "./notification-creation.service";

@Injectable({
  providedIn: "root",
})
export class NotificationsService {
  private readonly notificationCreationService = inject(NotificationCreationService);

  public open(notificationConfig: NotificationConfig): void {
    const notificationContainer = this.notificationCreationService.openNotificationContainer();
    notificationContainer.instance.openNotification(notificationConfig);
  }
}
