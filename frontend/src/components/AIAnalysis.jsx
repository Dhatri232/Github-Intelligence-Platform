function AIAnalysis({ text }) {

    if (!text) return null;

    return (

        <div>

            <h2>AI Analysis</h2>

            <pre>{text}</pre>

        </div>

    );
}
export default AIAnalysis;