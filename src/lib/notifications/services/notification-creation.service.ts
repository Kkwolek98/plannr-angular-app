import { ApplicationRef, ComponentRef, Injectable, createComponent, inject } from "@angular/core";
import { NotificationsContainerComponent } from "../components/notifications-container/notifications-container.component";

@Injectable({
  providedIn: "root",
})
export class NotificationCreationService {
  private readonly appRef = inject(ApplicationRef);
  private static container?: ComponentRef<NotificationsContainerComponent>;

  public openNotificationContainer(): ComponentRef<NotificationsContainerComponent> {
    if (!NotificationCreationService.container) {
      NotificationCreationService.container = this.createNotificationContainer();
    }

    return NotificationCreationService.container;
  }

  private createNotificationContainer(): ComponentRef<NotificationsContainerComponent> {
    const notificationContainerRef = createComponent(NotificationsContainerComponent, {
      environmentInjector: this.appRef.injector,
    });

    document.body.appendChild(notificationContainerRef.location.nativeElement);
    this.appRef.attachView(notificationContainerRef.hostView);
    notificationContainerRef.changeDetectorRef.detectChanges();

    return notificationContainerRef;
  }
}
