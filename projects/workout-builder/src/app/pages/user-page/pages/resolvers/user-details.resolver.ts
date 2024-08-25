import { inject } from "@angular/core";
import type { ResolveFn } from "@angular/router";
import { UserService } from "@workout-builder/app/services/user.service";
import { UserDetails } from "@workout-builder/app/types/user/user-details";

export const userDetailsResolver: ResolveFn<UserDetails> = (route, state) => {
  const userService = inject(UserService);
  return userService.getCurrentUserDetails$();
};
