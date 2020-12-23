import { Request, Response } from "@architect/shared/architect-types";
import {
  STATUSES,
  CONTENT_TYPES,
  stringify,
  log,
  ObjectLiteral,
} from "@architect/shared/utils";
import { webAppResponse, layoutPage, redirect } from "../../views/page-layout";
import arc from "@architect/functions";
import { dbOperation } from "@architect/shared/documentdb";
import assert from "assert";
import config from "@architect/shared/config";

// learn more about http functions here: https://arc.codes/guides/http
export async function handler(request: Request): Promise<Response> {
  const passwordResetToken = request.pathParameters.token;
  assert(passwordResetToken);
  const now = Date.now();
  let person: ObjectLiteral;
  try {
    // Go find a person with that token
    person = await dbOperation(function (database) {
      return database.collection("people").findOne({
        passwordResetToken,
        passwordResetTokenExpires: { $gte: now },
      });
    });
  } catch (error) {
    log(`Error getting person for password reset token ${error.message}`);
    // TODO - send to user via websocket
    //  "Password reset token is invalid or has expired.")
    return redirect("/forgot");
  }
  if (!person) {
    log(
      `Could not find person matching password reset token ${passwordResetToken}`
    );
    // TODO - send via websocket
    //  "Password reset token is invalid or has expired."
    return redirect("/forgot");
  }

  // passwordResetToken
  return webAppResponse;
}
