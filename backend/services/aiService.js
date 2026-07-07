const axios = require("axios");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const MODELS = [
  "qwen/qwen3-coder:free",
  "google/gemma-4-31b-it:free",
];
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

class AIService {
  async analyzeRepository(repository) {
    const prompt = `
You are an experienced Principal Software Engineer performing a comprehensive technical review of a GitHub repository.

Analyze the repository using BOTH the repository metadata and README.

Repository Metadata

Repository Name:
${repository.name}

Description:
${repository.description}

Primary Language:
${repository.language}

Topics:
${repository.topics.join(", ") || "None"}

Stars:
${repository.stars}

Forks:
${repository.forks}

README:

${(repository.readme || "").substring(0, 6000)}

Return ONLY valid Markdown.

Generate the report in the following format.

# 📌 Executive Summary

Explain what the project does in 3-5 sentences.

---

# 🏗 Architecture Overview

Infer the architecture if possible.

Mention things such as:

- Monolith
- Client-Server
- REST API
- Microservices
- MVC
- Component-based
- Layered Architecture

---

# ⚙ Technology Stack

List all detected technologies.

Languages

Frameworks

Libraries

Databases

Cloud Services

DevOps Tools

Testing Tools

Package Managers

---

# 📦 Key Features

Give 6-10 important features.

---

# 📊 Repository Health

Comment on:

- Popularity
- Community Activity
- Documentation
- Maintainability

---

# 🧹 Code Quality Review

Rate from 1-10.

Explain why.

---

# 🔒 Security Review

Mention potential security concerns.

Mention whether authentication, secrets, validation or dependency management should be improved.

---

# 🚀 Scalability

Estimate whether the project can scale.

Mention strengths and bottlenecks.

---

# ⚠ Potential Weaknesses

List 5-10 weaknesses.

---

# 💡 Suggested Improvements

List at least 10 improvements.

Focus on production readiness.

---

# 🎯 Best Use Cases

Mention industries or applications where this repository would be useful.

---

# 👨‍💻 Difficulty Level

Choose one:

Beginner

Intermediate

Advanced

Expert

Explain why.

---

# 📄 Resume Worthiness

Rate from 1-10.

Explain whether this project would impress recruiters.

---

# 🏆 Repository Intelligence Score

Provide an overall score out of 100.

Explain the score.
`;


    for (const model of MODELS) {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.4,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:5173",
          "X-Title": "GitHub Intelligence Platform",
        },
      }
    );

    console.log(`Using AI model: ${model}`);

    return response.data.choices[0].message.content;

  } catch (err) {
  console.log("\n==============================");
  console.log(`Model failed: ${model}`);

  if (err.response) {
    console.log("Status:", err.response.status);
    console.log("Response:", JSON.stringify(err.response.data, null, 2));
  } else {
    console.log(err.message);
  }
}
}

 try {
  console.log("Using Gemini fallback...");

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash"
  });

  const result = await model.generateContent(prompt);

  return result.response.text();

} catch (err) {
  console.log("Gemini failed:", err.message);

  return "AI analysis is currently unavailable.";
}
  }
}

module.exports = new AIService();