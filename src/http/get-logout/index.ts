import { Request, Response } from "@architect/shared/architect-types";
import redirect from "@architect/shared/redirect";
import arc from "@architect/functions";

export async function handler(request: Request): Promise<Response> {
  const cookie = await arc.http.session.write({ person: null });
  return redirect("/", cookie);
}
