require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { InferenceClient } = require("@huggingface/inference");

const client = new InferenceClient(process.env.HF_TOKEN);
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend Running");
});

const PORT = 5000;

app.get("/hello", (req, res) => {
    res.json({
        message: "Hello Frontend"
    });
});

app.post("/analyze", async (req, res) => {

    try {

        const { owner, repo } = req.body;

        const response = await axios.get(
            `https://api.github.com/repos/${owner}/${repo}`
        );

        res.json({
            name: response.data.name,
            stars: response.data.stargazers_count,
            forks: response.data.forks_count,
            language: response.data.language,
            issues: response.data.open_issues_count
        });
    }
    catch {
        res.status(500).json({
            message: "Error"
        });
    }
});
app.post("/languages", async (req, res) => {

    try {
        const { owner, repo } = req.body;
        const response = await axios.get(
            `https://api.github.com/repos/${owner}/${repo}/languages`
        );
        res.json(response.data);

    } catch {
        res.status(500).json({
            message: "Error"
        });
    }
});

app.post("/ai-analysis", async (req, res) => {

    try {
        const { owner, repo } = req.body;

        const readme = await axios.get(
            `https://api.github.com/repos/${owner}/${repo}/readme`
        );

        const readmeText = Buffer.from(
            readme.data.content,
            "base64"
        ).toString("utf8");
        res.json({
            readme: readmeText
        });

    } catch (error) {
        res.status(500).json({
            message: "Unable to fetch README"
        });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});