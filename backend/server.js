require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { HfInference } = require("@huggingface/inference");

const app = express();
app.use(cors());
app.use(express.json());

const hf = new HfInference(process.env.HF_TOKEN);

app.post("/api/repo", async (req, res) => {
    try {
        const { owner, repo } = req.body;

        const repoRes = await axios.get(`https://api.github.com/repos/${owner}/${repo}`);
        const langRes = await axios.get(repoRes.data.languages_url);

        res.json({
            name: repoRes.data.name,
            description: repoRes.data.description,
            stars: repoRes.data.stargazers_count,
            forks: repoRes.data.forks_count,
            issues: repoRes.data.open_issues_count,
            languages: langRes.data
        });
    } catch (error) {
        res.status(404).json({ message: "Repository not found or rate limit exceeded." });
    }
});

app.post("/api/ai-analysis", async (req, res) => {
    try {
        const { owner, repo } = req.body;

        const readmeRes = await axios.get(`https://api.github.com/repos/${owner}/${repo}/readme`);
        const readmeText = Buffer.from(readmeRes.data.content, "base64").toString("utf-8");
        const truncatedReadme = readmeText.substring(0, 3000);

        const prompt = `Based on the following GitHub README, provide a brief summary including: 1. Purpose 2. Key Features 3. Tech Stack. Keep it concise and professional.\n\nREADME:\n${truncatedReadme}`;

        const aiResponse = await hf.chatCompletion({
            model: "mistralai/Mistral-7B-Instruct-v0.3",
            messages: [{ role: "user", content: "You are a senior software engineer summarizing repositories. " + prompt }],
            max_tokens: 400,
        });

        res.json({ analysis: aiResponse.choices[0].message.content });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "AI Analysis failed. Hugging Face model might be loading." });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));