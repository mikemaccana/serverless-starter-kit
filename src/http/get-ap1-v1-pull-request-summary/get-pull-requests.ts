const REPO = "https://github.com//downshift";

import { Octokit } from "@octokit/rest";
import { log, ObjectLiteral } from "../../shared/utils";
import { addOrIncrement, dateStringToMonth, getNextMonth } from "./utils";

const MAX_RESULTS_PER_PAGE = 100;
export class GithubClient {
  owner: string;
  repo: string;
  octokit: Octokit;
  constructor(owner: string, repo: string, githubAuthToken: string) {
    this.owner = owner;
    this.repo = repo;
    this.octokit = new Octokit({
      userAgent: "Contact mike.maccana@gmail.com v1.0.0",
      auth: githubAuthToken,
    });
  }

  private getSinglePageOfPullRequests(pageNumber) {
    return this.octokit.pulls.list({
      owner: this.owner,
      repo: this.repo,
      per_page: MAX_RESULTS_PER_PAGE,
      page: pageNumber,
    });
  }

  public async getPullRequests(maxPages?: number) {
    // https://octokit.github.io/rest.js/v18#pulls-list
    let isDone = false;
    let page = 1;
    let results = [];
    while (!isDone) {
      let response = await this.getSinglePageOfPullRequests(page);
      results = results.concat(response.data);
      // We should really use a proper header parsing library
      const linkHeader = response.headers.link;
      const lastPage = linkHeader && !linkHeader.includes('rel="next"');
      if (lastPage) {
        isDone = true;
      }
      if (page >= maxPages) {
        isDone = true;
      }
      page++;
    }
    return results;
  }
}

export function padMissingMonths(monthlySum) {
  const paddedSum = {};
  const sortedMonths = Object.keys(monthlySum).sort();
  const firstMonth = sortedMonths[0];
  const finalMonth = sortedMonths[sortedMonths.length - 1];
  let thisMonth = firstMonth;
  let isComplete = false;
  while (!isComplete) {
    if (monthlySum.hasOwnProperty(thisMonth)) {
      paddedSum[thisMonth] = monthlySum[thisMonth];
    } else {
      paddedSum[thisMonth] = 0;
    }
    if (thisMonth === finalMonth) {
      isComplete = true;
    } else {
      thisMonth = getNextMonth(thisMonth);
    }
  }
  return paddedSum;
}

// Convert PRs from GitHub API to a map of dates
export function convertPullRequestsToMonthlySums(
  rawPullRequests: ObjectLiteral[]
) {
  // month as key, sum as data
  const CREATED_PR_SUMS = {};
  const CLOSED_PR_SUMS = {};
  rawPullRequests.forEach((rawPullRequest) => {
    const createdAtRaw = rawPullRequest.created_at;
    const closedAtRaw = rawPullRequest.closed_at;

    if (createdAtRaw) {
      const monthAndYearCreatedAt = dateStringToMonth(createdAtRaw);
      addOrIncrement(CREATED_PR_SUMS, monthAndYearCreatedAt);
    }

    if (closedAtRaw) {
      const monthAndYearClosedAt = dateStringToMonth(closedAtRaw);
      addOrIncrement(CLOSED_PR_SUMS, monthAndYearClosedAt);
    }
  });

  return {
    created: CREATED_PR_SUMS,
    closed: CLOSED_PR_SUMS,
  };
}
