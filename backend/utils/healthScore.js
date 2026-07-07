function calculateHealthScore(repo) {
  let score = 0;

  const breakdown = {};

  if (repo.stargazers_count >= 10000) {
    breakdown.stars = 25;
  } else if (repo.stargazers_count >= 1000) {
    breakdown.stars = 20;
  } else if (repo.stargazers_count >= 100) {
    breakdown.stars = 15;
  } else if (repo.stargazers_count >= 10) {
    breakdown.stars = 8;
  } else {
    breakdown.stars = 2;
  }

  if (repo.forks_count >= 1000) {
    breakdown.forks = 15;
  } else if (repo.forks_count >= 100) {
    breakdown.forks = 10;
  } else if (repo.forks_count >= 20) {
    breakdown.forks = 6;
  } else {
    breakdown.forks = 2;
  }

  if (repo.watchers_count >= 1000) {
    breakdown.watchers = 10;
  } else if (repo.watchers_count >= 100) {
    breakdown.watchers = 7;
  } else {
    breakdown.watchers = 3;
  }

  if (repo.open_issues_count <= 10) {
    breakdown.issues = 10;
  } else if (repo.open_issues_count <= 50) {
    breakdown.issues = 6;
  } else {
    breakdown.issues = 2;
  }

  breakdown.description = repo.description ? 5 : 0;
  breakdown.license = repo.license ? 5 : 0;
  breakdown.topics = repo.topics?.length ? 5 : 0;
  breakdown.wiki = repo.has_wiki ? 5 : 0;
  breakdown.archived = repo.archived ? 0 : 10;

  const lastUpdate = new Date(repo.updated_at);
  const today = new Date();

  const days =
    (today.getTime() - lastUpdate.getTime()) /
    (1000 * 60 * 60 * 24);

  if (days <= 30) {
    breakdown.activity = 10;
  } else if (days <= 180) {
    breakdown.activity = 7;
  } else if (days <= 365) {
    breakdown.activity = 4;
  } else {
    breakdown.activity = 1;
  }

  score = Object.values(breakdown).reduce((a, b) => a + b, 0);

  let grade = "Poor";

  if (score >= 90) grade = "Excellent";
  else if (score >= 75) grade = "Very Good";
  else if (score >= 60) grade = "Good";
  else if (score >= 40) grade = "Average";

  return {
    score,
    grade,
    breakdown,
  };
}

module.exports = calculateHealthScore;