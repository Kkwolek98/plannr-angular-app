import { Routes } from "@angular/router";
import { LoggedInLayoutComponent } from "./core/logged-in-layout/logged-in-layout.component";

export const routes: Routes = [
  {
    path: "login",
    loadComponent: () => import("./pages/login/login.component").then((c) => c.LoginComponent),
  },
  {
    path: "register",
    loadComponent: () => import("./pages/register/register.component").then((c) => c.RegisterComponent),
  },
  {
    component: LoggedInLayoutComponent,
    path: "",
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
