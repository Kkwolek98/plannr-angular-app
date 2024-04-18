import { HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { JwtService } from "../../services/jwt.service";

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const jwtService = inject(JwtService);
  const token = jwtService.getToken();

  if (!token || isRequestToWhitelistedApiPath(req)) {
    return next(req);
  }

  const clonedReq = req.clone({
    headers: req.headers.set("Authorization", `Bearer ${token}`),
  });

  return next(clonedReq);
};

const isRequestToWhitelistedApiPath = (req: HttpRequest<unknown>): boolean => {
  const whitelistedApiRoutes = ["auth"];
  const requestUrl = new URL(req.url);
  const firstUrlSegment = requestUrl.pathname.split("/")[1];

  return whitelistedApiRoutes.includes(firstUrlSegment);
};
