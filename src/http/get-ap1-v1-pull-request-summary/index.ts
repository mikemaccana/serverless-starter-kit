import { Request, Response } from "../../shared/architect-types";
import { STATUSES, CONTENT_TYPES, stringify, log } from "../../shared/utils";
import {
  convertPullRequestsToMonthlySums,
  GithubClient,
  padMissingMonths,
} from "./get-pull-requests";

import { config as dotEnvConfig } from "dotenv";

dotEnvConfig();

const githubAuthToken = process.env.GITHUB_AUTH_TOKEN;

export async function handler(request: Request): Promise<Response> {
  const githubClient = new GithubClient(
    "downshift-js",
    "downshift",
    githubAuthToken
  );
  const pullRequests = await githubClient.getPullRequests();
  const monthlySums = convertPullRequestsToMonthlySums(pullRequests);
  monthlySums.created = padMissingMonths(monthlySums.created);
  monthlySums.closed = padMissingMonths(monthlySums.closed);
  return {
    statusCode: STATUSES.OK,
    headers: {
      "Content-Type": CONTENT_TYPES.json,
    },
    body: stringify(monthlySums),
  };
}
