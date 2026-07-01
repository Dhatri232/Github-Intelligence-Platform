import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

function LanguageChart({ languages }) {

    if (!languages) return null;

    const data = {

        labels: Object.keys(languages),

        datasets: [

            {

                data: Object.values(languages),

            },

        ],

    };

    return (
        <div style={{ width: "400px" }}>
            <Pie data={data} />
        </div>
    );
}
export default LanguageChart;