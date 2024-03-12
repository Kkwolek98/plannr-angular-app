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
    canActivateChild: [loggedInGuard],
    children: [
      {
        path: "exercises",
        loadChildren: () => import("./pages/exercises-page/exercises.routes").then((c) => c.exerciseRoutes),
      },
      {
        path: "workouts",
        loadChildren: () => import("./pages/workouts-page/workouts.routes").then((c) => c.workoutsRoutes),
      },
    ],
  },
];
