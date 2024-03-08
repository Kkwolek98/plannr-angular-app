import { Route } from "@angular/router";
import { workoutsResolver } from "./resolvers/workouts.resolver";
import { WorkoutsPageComponent } from "./workouts-page.component";

export const workoutsRoutes: Route[] = [
  {
    component: WorkoutsPageComponent,
    path: "",
    resolve: { workouts: workoutsResolver },
  },
];
