import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Dashboard: React.FC = () => {
  const aboveThreshold = 90;

  // Function to determine quality ranking based on percentage
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
    <div className="p-4 min-h-full">
      <div className="container mx-auto space-y-6">
        {/* Combined Card for Videos, Download Button, Collection Information, and Circular Chart */}
        <div className="rounded-lg shadow-md p-6 bg-white/10 relative">
          {/* Plant Name Tag on the Top Left */}
          <div className="absolute top-0 left-0 bg-gray-200 text-black px-4 py-2 font-semibold text-xl">
            Azalea
          </div>

          {/* Videos Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="mb-2 text-center font-semibold">Original Video</p>
              <video className="w-full h-48 rounded-md border-2 border-gray-200" controls>
                Video 1
              </video>
            </div>
            <div>
              <p className="mb-2 text-center font-semibold">Annotated Video</p>
              <video className="w-full h-48 rounded-md border-2 border-gray-200" controls>
                Video 2
              </video>
            </div>
          </div>

          {/* Bed and Download Button in Same Row */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-xl">Bed: A-12</h3>
            <button className="px-4 py-2 bg-green-500 rounded-lg transition hover:bg-green-700">
              Download CSV/XLSX
            </button>
          </div>

          {/* Collection Information, Average Values, and Circular Chart */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* First Column: Collection Information */}
            <div>
              <ul className="space-y-2">
                <li><strong>Collection Date:</strong> 2024-10-03</li>
                <li><strong>GPS Location:</strong> 40.1234° N, 111.1234° W</li>
                <li><strong>Total Plants:</strong> 50</li>
                <li><strong>Plants Above Threshold:</strong> 30</li>
              </ul>
            </div>

            {/* Second Column: Average Values */}
            <div>
              <ul className="space-y-2">
                <li><strong>Average Circularity:</strong> 0.85</li>
                <li><strong>Average Eccentricity:</strong> 0.45</li>
                <li><strong>Average Perimeter:</strong> 25.6 cm</li>
                <li><strong>Average Area:</strong> 15.4 cm²</li>
              </ul>
            </div>

            {/* Third Column: Circular Chart for Quality Assessment */}
            <div className="flex flex-col items-center justify-center space-y-4 border-2">
              <div className="w-40 h-40">
                <CircularProgressbar
                  value={aboveThreshold}
                  text={`${aboveThreshold}%`}
                  styles={buildStyles({
                    textColor: "white",
                    pathColor: aboveThreshold >= 70 ? "#4caf50" : aboveThreshold >= 50 ? "#ffa500" : "#f44336",
                    trailColor: "#d6d6d6",
                  })}
                />
              </div>
              <div className="text-lg font-bold">{quality}</div>
            </div>
          </div>
        </div>

        {/* Plant Details Cards */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(4)].map((_, idx) => (
            <div key={idx} className="rounded-lg shadow-lg p-6 flex items-center space-x-4 bg-white/10">
              <img
                src="https://via.placeholder.com/150"
                alt="Plant"
                className="w-1/3 rounded-md shadow-sm"
              />
              <div className="flex-1">
                <p><strong>Circularity:</strong> 0.85</p>
                <p><strong>Eccentricity:</strong> 0.45</p>
                <p><strong>Area:</strong> 15.4 cm²</p>
                <p><strong>Perimeter:</strong> 25.6 cm</p>
                <p><strong>Confidence Threshold:</strong> 95%</p>
                <p><strong>Appearance:</strong> Healthy</p>
                <p><strong>ID:</strong> 1234</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;