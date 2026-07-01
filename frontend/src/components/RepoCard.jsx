function RepoCard({ repo }) {

    if (!repo) return null;

    return (
        <div style={{ marginTop: "20px" }}>
            <h2>{repo.name}</h2>

            <p>⭐ Stars: {repo.stars}</p>

            <p>🍴 Forks: {repo.forks}</p>

            <p>💻 Language: {repo.language}</p>

            <p>🐞 Issues: {repo.issues}</p>

        </div>
    );
}

export default RepoCard;