import { log, STATUSES, SECONDS } from "../../../shared/utils";
import {
  GithubClient,
  convertPullRequestsToMonthlySums,
  padMissingMonths,
} from "../get-pull-requests";
import { mockPullRequests } from "./mock-pull-requests";

import { config as dotEnvConfig } from "dotenv";

dotEnvConfig();

const githubAuthToken = process.env.GITHUB_AUTH;

describe(`GithubClient`, () => {
  it(`Gets a list of PRs`, async () => {
    const githubClient = new GithubClient(
      "downshift-js",
      "downshift",
      githubAuthToken
    );
    const pullRequests = await githubClient.getPullRequests();
    const aReasonbleAmountofRequestsForAnInactiveProject = 2;
    expect(pullRequests.length).toBeGreaterThanOrEqual(
      aReasonbleAmountofRequestsForAnInactiveProject
    );
  });

  it(`Gets a list of PRs for a large project requiring pagination`, async () => {
    // This is a bit slower due to concatenation
    jest.setTimeout(20 * SECONDS);
    const githubClient = new GithubClient("nodejs", "node", githubAuthToken);
    const pullRequests = await githubClient.getPullRequests();
    const aReasonbleAmountofRequestsForABusyProject = 150;
    expect(pullRequests.length).toBeGreaterThanOrEqual(
      aReasonbleAmountofRequestsForABusyProject
    );
  });

  it(`Filters PRs`, async () => {
    const monthlySum = convertPullRequestsToMonthlySums(mockPullRequests);
    expect(monthlySum.created).toEqual({
      "201911": 1,
      "202005": 1,
      "202008": 1,
      "202009": 1,
      "202011": 1,
    });
    expect(monthlySum.closed).toEqual({
      "202006": 2,
      "202008": 1,
      "202009": 1,
      "202012": 1,
    });
  });

  it(`Pads missing data`, async () => {
    const monthlySum = convertPullRequestsToMonthlySums(mockPullRequests);
    const paddedMonthlySum = padMissingMonths(monthlySum.created);

    expect(paddedMonthlySum).toEqual({
      "201911": 1,
      "201912": 0,
      "202001": 0,
      "202002": 0,
      "202003": 0,
      "202004": 0,
      "202005": 1,
      "202006": 0,
      "202007": 0,
      "202008": 1,
      "202009": 1,
      "202010": 0,
      "202011": 1,
    });
  });
});
