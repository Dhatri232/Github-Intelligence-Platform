const axios = require("axios");

const GITHUB_API_BASE = "https://api.github.com";

class GitHubService {
  constructor(token) {
    this.token = token;

    this.client = axios.create({
      baseURL: GITHUB_API_BASE,
      headers: {
        Accept: "application/vnd.github.v3+json",
        ...(token && {
          Authorization: `token ${token}`,
        }),
      },
    });
  }

  async getRepository(owner, repo) {
    try {
      const response = await this.client.get(`/repos/${owner}/${repo}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch repository"
      );
    }
  }

  async getLanguages(owner, repo) {
    try {
      const response = await this.client.get(
        `/repos/${owner}/${repo}/languages`
      );
      return response.data;
    } catch (error) {
      return {};
    }
  }

  async getContributors(owner, repo) {
    try {
      const response = await this.client.get(
        `/repos/${owner}/${repo}/contributors?per_page=10`
      );
      return response.data;
    } catch (error) {
      return [];
    }
  }

  async getCommits(owner, repo) {
    try {
      const response = await this.client.get(
        `/repos/${owner}/${repo}/commits?per_page=10`
      );
      return response.data;
    } catch (error) {
      return [];
    }
  }

  async getReadme(owner, repo) {
    try {
      const response = await this.client.get(
        `/repos/${owner}/${repo}/readme`,
        {
          headers: {
            Accept: "application/vnd.github.v3.raw",
          },
        }
      );

      return response.data;
    } catch (error) {
      return "";
    }
  }

  calculateHealthScore(repo) {
    let score = 50;

    if (repo.stargazers_count > 100) score += 15;
    if (repo.stargazers_count > 1000) score += 10;
    if (repo.forks_count > 50) score += 10;
    if (repo.open_issues_count < 10) score += 10;
    if (!repo.archived) score += 5;
    if (repo.has_wiki) score += 3;
    if (repo.has_issues) score += 3;
    if (repo.description) score += 4;
    if (repo.topics && repo.topics.length > 0) score += 5;

    return Math.min(score, 100);
  }
}

module.exports = GitHubService;