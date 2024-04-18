import { inject } from "@angular/core";
import { Router, type CanActivateChildFn } from "@angular/router";
import { JwtService } from "../../services/jwt.service";

export const loggedInGuard: CanActivateChildFn = () => {
  const jwtService = inject(JwtService);
  const router = inject(Router);

  if (!jwtService.getToken()) {
    router.navigate(["/login"]);
    return false;
  }

  return true;
};
