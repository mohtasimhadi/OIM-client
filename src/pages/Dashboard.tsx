import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className={`p-4 min-h-full`}>
      <div className="container mx-auto space-y-6">
        {/* Upload Section */}
        <div className={`rounded-lg shadow-md p-6 bg-white/10 `}>
          <button className={`px-4 py-2 rounded-lg transition hover:bg-blue-700`}>
            Upload
          </button>
        </div>

        {/* Videos Section */}
        <div className={`rounded-lg shadow-md p-6 grid grid-cols-1 md:grid-cols-2 gap-4 bg-white/10`}>
          <video className="w-full h-48 rounded-md border-2 border-gray-200" controls>
            Video 1
          </video>
          <video className="w-full h-48 rounded-md border-2 border-gray-200" controls>
            Video 2
          </video>
        </div>

        {/* Download Section */}
        <div className={`rounded-lg shadow-md p-6 text-center bg-white/10`}>
          <button className={`px-4 py-2 bg-green-500 rounded-lg transition hover:bg-green-700`}>
            Download CSV/XLSX
          </button>
        </div>

        {/* Collection Information Card */}
        <div className={`rounded-lg shadow-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/10 `}>
          <h3 className="font-semibold text-xl col-span-full">Collection Information</h3>
          <ul className="space-y-2">
            <li><strong>Collection Date:</strong> 2024-10-03</li>
            <li><strong>Plant Name:</strong> Azalea</li>
            <li><strong>Bed:</strong> A-12</li>
            <li><strong>GPS Location:</strong> 40.1234° N, 111.1234° W</li>
            <li><strong>Total Plants:</strong> 50</li>
            <li><strong>Plants Above Threshold:</strong> 30</li>
          </ul>
          <ul className="space-y-2">
            <li><strong>Average Circularity:</strong> 0.85</li>
            <li><strong>Average Eccentricity:</strong> 0.45</li>
            <li><strong>Average Perimeter:</strong> 25.6 cm</li>
            <li><strong>Average Area:</strong> 15.4 cm²</li>
          </ul>
        </div>

        {/* Plant Details Cards */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(4)].map((_, idx) => (
            <div key={idx} className={`rounded-lg shadow-lg p-6 flex items-center space-x-4 bg-white/10 `}>
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
