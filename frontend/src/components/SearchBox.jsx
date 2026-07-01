import AIAnalysis from "./AIAnalysis";
import { useState } from "react";
import RepoCard from "./RepoCard";
import LanguageChart from "./LanguageChart";

function SearchBox() {

    const [url, setUrl] = useState("");
    const [repo, setRepo] = useState(null);
    const [aiAnalysis, setAiAnalysis] = useState("");
    const [languages, setLanguages] = useState(null);

    const analyzeRepo = async () => {

        const parts = url.split("/");

        const owner = parts[3];
        const repository = parts[4];

        const response = await fetch("http://localhost:5000/analyze", {

            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                owner,
                repo: repository,
            }),

        });

        const data = await response.json();

        setRepo(data);
        const aiResponse = await fetch(
    "http://localhost:5000/ai-analysis",
    {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            owner,
            repo: repository
        })

    }
);

const aiData = await aiResponse.json();

setAiAnalysis(aiData.readme);

        const languageResponse = await fetch(
    "http://localhost:5000/languages",
    {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            owner,
            repo: repository
        })

    }
);

const languageData = await languageResponse.json();

setLanguages(languageData);
    };

    return (

        <div>

            <input
                type="text"
                placeholder="https://github.com/facebook/react"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
            />

            <button onClick={analyzeRepo}>
                Analyze
            </button>

            <RepoCard repo={repo} />
            <LanguageChart languages={languages} />

        </div>
    );
}

export default SearchBox;