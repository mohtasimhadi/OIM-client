import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface CircularChartProps {
  plantName: string;
  aboveThreshold: number; // Percentage of plants above threshold (0-100)
}

const CircularChart: React.FC<CircularChartProps> = ({ plantName, aboveThreshold }) => {
  // Determine quality ranking based on the aboveThreshold percentage
  const getQuality = (percentage: number): string => {
    if (percentage >= 90) return "Good Quality";
    if (percentage >= 80) return "Average Quality";
    if (percentage >= 70) return "Moderate Quality";
    if (percentage >= 60) return "Below Average Quality";
    if (percentage >= 50) return "Poor Quality";
    if (percentage >= 40) return "Very Poor Quality";
    if (percentage >= 30) return "Low Quality";
    if (percentage >= 20) return "Very Low Quality";
    if (percentage >= 10) return "Critical Quality";
    return "Extremely Critical Quality";
  };

  const quality = getQuality(aboveThreshold);

  return (
    <div className="flex flex-col items-center space-y-4 p-4 rounded-lg shadow-md bg-white/10 w-80">
      {/* Plant Name Box */}
      <div className="bg-gray-200 text-black px-4 py-2 rounded-md font-semibold">
        {plantName}
      </div>

      {/* Circular Chart */}
      <div className="w-40 h-40">
        <CircularProgressbar
          value={aboveThreshold}
          text={`${aboveThreshold}%`}
          styles={buildStyles({
            textColor: "black",
            pathColor: aboveThreshold >= 70 ? "#4caf50" : aboveThreshold >= 50 ? "#ffa500" : "#f44336",
            trailColor: "#d6d6d6",
          })}
        />
      </div>

      {/* Quality Label */}
      <div className="text-lg font-bold">
        {quality}
      </div>
    </div>
  );
};

export default CircularChart;
