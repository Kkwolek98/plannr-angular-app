import { Route } from "@angular/router";
import { userDetailsResolver } from "./pages/resolvers/user-details.resolver";
import { UserDetailsPageComponent } from "./pages/user-details-page/user-details-page.component";

export const userRoutes: Route[] = [
  {
    component: UserDetailsPageComponent,
    path: "",
    resolve: { userDetails: userDetailsResolver },
  },
];
