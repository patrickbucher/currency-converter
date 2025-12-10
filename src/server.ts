import { err } from "./http.ts";
import { routes } from "./routing.ts";

Deno.serve((req) => {
  const url = new URL(req.url);
  for (const { method, pattern, capture, authenticate, handle } of routes) {
    if (method != req.method) {
      continue;
    }
    const match = pattern.exec(url.pathname);
    if (match === null) {
      continue;
    }
    if (!authenticate(req)) {
      return err({ message: "UNAUTHORIZED" }, 401);
    }
    return handle(req, capture(match));
  }
  return err({ message: `${url} NOT FOUND` }, 404);
});
