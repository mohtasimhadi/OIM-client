import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface QualityChartProps {
  value: number;
}

const QualityChart: React.FC<QualityChartProps> = ({ value }) => {
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

  const quality = getQuality(value);
  const pathColor = value >= 70 ? "#4caf50" : value >= 50 ? "#ffa500" : "#f44336";

  return (
    <div className="flex flex-col items-center justify-center space-y-4 border-2">
      <div className="w-40 h-40">
        <CircularProgressbar
          value={value}
          text={`${value}%`}
          styles={buildStyles({
            textColor: "white",
            pathColor: pathColor,
            trailColor: "#d6d6d6",
          })}
        />
      </div>
      <div className="text-lg font-bold">{quality}</div>
    </div>
  );
};

export default QualityChart;