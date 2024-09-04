import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { provideRouter } from "@angular/router";

import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { NgxsModule } from "@ngxs/store";
import { routes } from "./app.routes";
import { errorInterceptor } from "./core/interceptors/error.interceptor";
import { jwtInterceptor } from "./core/interceptors/jwt.interceptor";
import { PlanningState } from "./pages/planning-page/store/state/planning.state";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([jwtInterceptor, errorInterceptor])),
    importProvidersFrom(NgxsModule.forRoot([PlanningState])),
  ],
};
