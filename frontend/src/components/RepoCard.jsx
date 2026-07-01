import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function RepoCard({ repo, aiData, loadingAi }) {
  // Extract top 5 languages
  const languageNames = Object.keys(repo.languages).slice(0, 5);
  const languageValues = Object.values(repo.languages).slice(0, 5);

  const chartData = {
    labels: languageNames,
    datasets: [
      {
        data: languageValues,
        // Standard GitHub colors for common languages
        backgroundColor: ['#f1e05a', '#3178c6', '#e34c26', '#563d7c', '#c6538c'],
        borderColor: '#1f2937', // matches gray-800 background
        borderWidth: 4,
      },
    ],
  };

  const chartOptions = {
    cutout: '75%', // Makes it a sleek ring instead of a full pie
    plugins: {
      legend: { position: 'right', labels: { color: '#9ca3af', padding: 20 } },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Left Column: Stats & Chart */}
      <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 shadow-xl flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-bold text-white capitalize">{repo.name}</h2>
          <p className="text-gray-400 mt-2">{repo.description || "No description provided."}</p>
        </div>
        
        <div className="flex gap-6 text-sm font-medium">
          <div className="bg-gray-700/50 px-4 py-2 rounded-lg text-yellow-400">⭐ {repo.stars} Stars</div>
          <div className="bg-gray-700/50 px-4 py-2 rounded-lg text-blue-400">🍴 {repo.forks} Forks</div>
          <div className="bg-gray-700/50 px-4 py-2 rounded-lg text-green-400">🎯 {repo.issues} Issues</div>
        </div>

        <div className="h-64 mt-4 relative">
          {languageNames.length > 0 ? (
             <Doughnut data={chartData} options={chartOptions} />
          ) : (
             <p className="text-gray-500 text-center mt-10">No language data available</p>
          )}
        </div>
      </div>

      {/* Right Column: AI Analysis */}
      <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 shadow-xl flex flex-col">
        <div className="flex items-center gap-3 mb-4 border-b border-gray-700 pb-4">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center text-xl">
            ✨
          </div>
          <h3 className="text-xl font-bold text-white">AI Architecture Analysis</h3>
        </div>

        <div className="flex-1 overflow-y-auto">
          {loadingAi ? (
            <div className="space-y-4 animate-pulse mt-4">
              <div className="h-4 bg-gray-700 rounded w-3/4"></div>
              <div className="h-4 bg-gray-700 rounded w-full"></div>
              <div className="h-4 bg-gray-700 rounded w-5/6"></div>
              <div className="mt-8 text-sm text-gray-500">The AI model is reading the README...</div>
            </div>
          ) : (
            <div className="text-gray-300 leading-relaxed whitespace-pre-wrap text-sm">
              {aiData || "Could not generate analysis."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RepoCard;