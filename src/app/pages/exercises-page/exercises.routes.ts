import { Route } from "@angular/router";
import { ExercisesPageComponent } from "./exercises-page.component";
import { ExercisesComponent } from "./pages/exercises/exercises.component";
import { exercisesResolver } from "./resolvers/exercises.resolver";

export const exerciseRoutes: Route[] = [
  {
    path: "",
    component: ExercisesPageComponent,
    resolve: { exercises: exercisesResolver },
    children: [
      {
        path: "",
        component: ExercisesComponent,
      },
    ],
  },
];
