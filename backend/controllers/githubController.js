const axios = require("axios");

exports.analyzeRepo = async (req, res) => {

    try {

        const { owner, repo } = req.body;

        const response = await axios.get(
            `https://api.github.com/repos/${owner}/${repo}`
        );

        res.json(response.data);

    }
    catch (error) {

        res.status(500).json({
            message: "Repository not found"
        });

    }
};