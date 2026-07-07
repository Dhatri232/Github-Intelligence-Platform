const express = require("express");
const { HfInference } = require("@huggingface/inference");
const GitHubService = require("../services/githubService");

const router = express.Router();

const hf = new HfInference(process.env.HF_TOKEN);
const githubService = new GitHubService(process.env.GITHUB_TOKEN || "");

router.get("/repo/:owner/:repo", async (req, res) => {
  try {
    const { owner, repo } = req.params;

    const repoInfo = await githubService.getRepository(owner, repo);

    const languages = await githubService.getLanguages(owner, repo);

    const contributors = await githubService.getContributors(owner, repo);

    const commits = await githubService.getCommits(owner, repo);

    const healthScore =
      githubService.calculateHealthScore(repoInfo);

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

      healthScore,

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
    });
  } catch (err) {
    res.status(404).json({
      message: "Repository not found",
    });
  }
});

router.get("/contributors/:owner/:repo", async (req, res) => {
  try {
    const { owner, repo } = req.params;
    const contributors = await githubService.getContributors(owner, repo);

    const data = contributors.map((c) => ({
      name: c.login,
      avatar: c.avatar_url,
      contributions: c.contributions,
      url: c.html_url,
    }));

    res.json(data);
  } catch (error) {
    res.status(404).json({ message: "Failed to fetch contributors" });
  }
});

router.get("/commits/:owner/:repo", async (req, res) => {
  try {
    const { owner, repo } = req.params;
    const commits = await githubService.getCommits(owner, repo);

    const data = commits.map((c) => ({
      message: c.commit.message,
      author: c.commit.author?.name || c.author?.login,
      date: c.commit.author?.date,
      url: c.html_url,
      sha: c.sha.substring(0, 7),
    }));

    res.json(data);
  } catch (error) {
    res.status(404).json({ message: "Failed to fetch commits" });
  }
});

router.post("/analyze/:owner/:repo", async (req, res) => {
  try {
    const { owner, repo } = req.params;

    const readme = await githubService.getReadme(owner, repo);
    const truncated = readme.substring(0, 3000);

    if (!truncated) {
      return res.json({
        analysis:
          "No README found. This repository appears to be minimal or undocumented.",
      });
    }

    const prompt = `You are a senior software engineer. Analyze this GitHub README and provide:
1. Project Purpose (1-2 sentences)
2. Key Features (3-5 bullet points)
3. Tech Stack (comma-separated)
4. Code Quality Assessment (1 sentence)

Keep it concise and professional.

README:
${truncated}`;

    const aiResponse = await hf.textGeneration({
      model: "mistralai/Mistral-7B-Instruct-v0.3",
      inputs: prompt,
      parameters: {
        max_new_tokens: 300,
        temperature: 0.7,
      },
    });

    res.json({ analysis: aiResponse.generated_text });
  } catch (error) {
    console.error("AI Analysis error:", error);
    res.status(500).json({
      analysis: "AI analysis unavailable. Please try again later.",
    });
  }
});

module.exports = router;