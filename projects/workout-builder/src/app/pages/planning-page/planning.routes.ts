import { Route } from "@angular/router";
import { PlanNewPageComponent } from "./pages/plan-new-page/plan-new-page.component";
import { PlanningPageComponent } from "./planning-page.component";

export const planningRoutes: Route[] = [
  {
    component: PlanningPageComponent,
    path: "",
  },
  {
    component: PlanNewPageComponent,
    path: "new",
  },
];
