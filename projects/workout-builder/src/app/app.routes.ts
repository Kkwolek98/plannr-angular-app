import { Routes } from "@angular/router";
import { LoggedInLayoutComponent } from "./components/logged-in-layout/logged-in-layout.component";
import { loggedInGuard } from "./core/guards/logged-in.guard";
import { loggedOutGuard } from "./core/guards/logged-out.guard";

export const routes: Routes = [
  {
    path: "login",
    canActivate: [loggedOutGuard],
    loadComponent: () => import("./pages/login/login.component").then((c) => c.LoginComponent),
  },
  {
    path: "register",
    canActivate: [loggedOutGuard],
    loadComponent: () => import("./pages/register/register.component").then((c) => c.RegisterComponent),
  },
  {
    component: LoggedInLayoutComponent,
    path: "",
    canActivate: [loggedInGuard],
    children: [
      {
        path: "exercises",
        loadChildren: () => import("./pages/exercises-page/exercises.routes").then((c) => c.exerciseRoutes),
      },
      {
        path: "workout-templates",
        loadChildren: () =>
          import("./pages/workout-templates-page/workout-templates.routes").then((c) => c.workoutsRoutes),
      },
      {
        path: "user",
        loadChildren: () => import("./pages/user-page/user.routes").then((c) => c.userRoutes),
      },
    ],
  },
];
