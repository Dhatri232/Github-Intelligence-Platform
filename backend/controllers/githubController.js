const githubService = require("../services/githubService");
const aiService = require("../services/aiService");
const calculateHealthScore = require("../utils/healthScore");

exports.getRepository = async (req, res) => {
  try {
    const { owner, repo } = req.params;

    const repoInfo = await githubService.getRepository(owner, repo);

    const [
      languages,
      contributors,
      commits,
      readme,
    ] = await Promise.all([
      githubService.getLanguages(owner, repo),
      githubService.getContributors(owner, repo),
      githubService.getCommits(owner, repo),
      githubService.getReadme(owner, repo),
    ]);

    const health = calculateHealthScore(repoInfo);

    let analysis = "AI analysis unavailable.";

try {
  analysis = await aiService.analyzeRepository({
    name: repoInfo.name,
    description: repoInfo.description || "No description",
    language: repoInfo.language || "Unknown",
    topics: repoInfo.topics || [],
    stars: repoInfo.stargazers_count,
    forks: repoInfo.forks_count,
    readme: (readme || "").substring(0, 5000),
  });
} catch (error) {
  console.error("AI Error:", error.message);
}

    res.json({
      repo: {
        name: repoInfo.name,
        description: repoInfo.description,
        url: repoInfo.html_url,
        stars: repoInfo.stargazers_count,
        forks: repoInfo.forks_count,
        watchers: repoInfo.watchers_count,
        issues: repoInfo.open_issues_count,
        language: repoInfo.language,
        topics: repoInfo.topics || [],
        license: repoInfo.license?.name || "None",
        size: repoInfo.size,
        createdAt: repoInfo.created_at,
        updatedAt: repoInfo.updated_at,
      },

      languages,

      contributors: contributors.map((c) => ({
        name: c.login,
        avatar: c.avatar_url,
        contributions: c.contributions,
        url: c.html_url,
      })),

      commits: commits.map((c) => ({
        sha: c.sha.substring(0, 7),
        message: c.commit.message,
        author: c.commit.author?.name || c.author?.login,
        date: c.commit.author?.date,
        url: c.html_url,
      })),

      healthScore: health.score,
      healthGrade: health.grade,
      healthBreakdown: health.breakdown,

      analysis,
    });

  } catch (err) {
    console.error(err);

    res.status(404).json({
      message: "Repository not found",
    });
  }
};