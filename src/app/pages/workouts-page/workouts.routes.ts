import { Route } from "@angular/router";
import { workoutResolver } from "./resolvers/workout.resolver";
import { workoutsResolver } from "./resolvers/workouts.resolver";
import { WorkoutsPageComponent } from "./workouts-page.component";

export const workoutsRoutes: Route[] = [
  {
    component: WorkoutsPageComponent,
    path: "",
    resolve: { workouts: workoutsResolver },
  },
  {
    loadComponent: () =>
      import("./pages/workout-builder-page/workout-builder-page.component").then(
        (c) => c.WorkoutBuilderPageComponent
      ),
    path: ":id",
    resolve: { workout: workoutResolver },
  },
];
