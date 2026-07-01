import { useState } from "react";
import SearchBox from "./components/SearchBox";
import RepoCard from "./components/RepoCard";

function App() {
  const [repoData, setRepoData] = useState(null);
  const [aiData, setAiData] = useState(null);
  const [loadingRepo, setLoadingRepo] = useState(false);
  const [loadingAi, setLoadingAi] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (url) => {
    const urlParts = url.replace(/\/$/, "").split("/");
    const repo = urlParts.pop();
    const owner = urlParts.pop();

    if (!owner || !repo) {
      setError("Please enter a valid GitHub repository URL.");
      return;
    }

    setError("");
    setRepoData(null);
    setAiData(null);
    setLoadingRepo(true);
    setLoadingAi(true);

    try {
      const repoRes = await fetch("http://localhost:5000/api/repo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ owner, repo }),
      });

      if (!repoRes.ok) throw new Error("Repository not found.");
      const repoJson = await repoRes.json();
      setRepoData(repoJson);
      setLoadingRepo(false);

      const aiRes = await fetch("http://localhost:5000/api/ai-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ owner, repo }),
      });

      if (aiRes.ok) {
        const aiJson = await aiRes.json();
        setAiData(aiJson.analysis);
      } else {
        setAiData("AI analysis is currently unavailable.");
      }

      setLoadingAi(false);
    } catch (err) {
      setError(err.message);
      setLoadingRepo(false);
      setLoadingAi(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            GitHub Intelligence
          </h1>
          <p className="text-gray-400">Analyze any repository with AI</p>
        </div>

        <SearchBox onSearch={handleSearch} />

        {error && (
          <div className="p-4 bg-red-900/50 border border-red-500 rounded-lg text-red-200">
            {error}
          </div>
        )}

        {loadingRepo && (
          <div className="text-center animate-pulse text-blue-400">
            Fetching repository data...
          </div>
        )}

        {repoData && (
          <RepoCard repo={repoData} aiData={aiData} loadingAi={loadingAi} />
        )}
      </div>
    </div>
  );
}

export default App;