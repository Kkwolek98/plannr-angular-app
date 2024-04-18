export type NotificationConfig = {
  message: string;
  type: "success" | "error" | "warning" | "info";
  duration?: number;
};

export type Notification = NotificationConfig & {
  id: string;
};
