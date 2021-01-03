import { Request, Response } from "@architect/shared/architect-types";
import { log, ObjectLiteral, stringify } from "@architect/shared/utils";
import arc from "@architect/functions";
import redirect from "@architect/shared/redirect";
import { authenticateWithEmail } from "@architect/shared/authentication";

// Check credentials
async function handler(request: Request): Promise<Response> {
  const body: ObjectLiteral = request.body as ObjectLiteral;
  const { email, password } = body;
  log({ email, password });
  const person = await authenticateWithEmail(email, password);

  // Throw away bad logins
  if (!person) {
    log(`Invalid login attempt for ${email}`);
    return redirect("/login");
  }

  // Otherwise attach the person to the session
  const cookie = await arc.http.session.write({ person });
  log(`Attached a person ${person._id} to the session.`);
  return redirect("/", cookie);
}

// Needed to decode form data
exports.handler = arc.http.async(handler);
