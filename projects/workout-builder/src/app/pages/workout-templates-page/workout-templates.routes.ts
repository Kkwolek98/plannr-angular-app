import { Route } from "@angular/router";
import { workoutResolver } from "./resolvers/workout.resolver";
import { workoutTemplatesResolver } from "./resolvers/workouts.resolver";
import { WorkoutTemplatesPageComponent } from "./workout-templates-page.component";

export const workoutsRoutes: Route[] = [
  {
    component: WorkoutTemplatesPageComponent,
    path: "",
    resolve: { workouts: workoutTemplatesResolver },
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
