import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";

import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { routes } from "./app.routes";
import { errorInterceptor } from "./core/interceptors/error.interceptor";
import { jwtInterceptor } from "./core/interceptors/jwt.interceptor";

export const envConfig = {
  url: "http://localhost:8000",
} as const;

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(withInterceptors([jwtInterceptor, errorInterceptor]))],
};
