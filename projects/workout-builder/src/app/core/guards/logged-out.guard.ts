import { inject } from "@angular/core";
import { Router, type CanActivateFn } from "@angular/router";
import { JwtService } from "../../services/jwt.service";

export const loggedOutGuard: CanActivateFn = () => {
  const jwtService = inject(JwtService);
  const router = inject(Router);
  if (jwtService.getToken()) {
    router.navigate(["/exercises"]);
    return false;
  }
  return true;
};
