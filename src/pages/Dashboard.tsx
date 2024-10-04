import React from 'react';
import VideoCard from '../components/VideoCard';
import PlantDetailCard from '../components/PlantDetailCard';

interface CircularProgressProps {
  value: number;
  label: string;
  size?: 'small' | 'large';
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  label,
  size = 'large',
}) => {
  const sizeClass = size === 'small' ? 'w-24 h-24' : 'w-48 h-48';
  const fontSizeClass = size === 'small' ? 'text-xs' : 'text-sm';
  const labelFontSizeClass = size === 'small' ? 'text-xs' : 'text-base';

  return (
    <div className="flex flex-col items-center space-y-1 border-white border justify-center p-4 border-4 hover:bg-white/20">
      <div className={`relative ${sizeClass}`}>
        <svg className={`${sizeClass} transform -rotate-90`} viewBox="0 0 36 36">
          {/* Background Circle */}
          <path
            className="text-gray-400"
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
            strokeDasharray="4, 2" // Dashed stroke
          />
          {/* Progress Circle */}
          <path
            className="text-white"
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
            strokeDasharray={`${value * 100}, 100`}
            strokeLinecap="round"
          />
        </svg>
        {/* Value inside the circle */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`font-semibold text-white ${fontSizeClass}`}>
            {(value * 100).toFixed(1)}%
          </span>
        </div>
      </div>
      <div className={`text-white font-semibold ${labelFontSizeClass}`}>{label}</div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  return (
    <div className="p-4 min-h-full">
      <div className="container mx-auto space-y-6">
        {/* Combined Card for Videos, Download Button, Collection Information, and Circular Chart */}
        <div className="rounded-lg shadow-md p-6 bg-white/10 relative">
          {/* Plant Name Tag on the Top Left */}
          <div className="absolute top-0 left-0 bg-gray-200 text-black px-4 py-2 font-semibold text-xl rounded-tl-lg rounded-br-lg">
            Azalea | Bed: A-12
          </div>
          <button className="absolute px-4 py-2 top-0 right-0 bg-blue-500 text-xl rounded-tr-lg rounded-bl-lg transition hover:bg-blue-700">
            Download XLSX
          </button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 pt-10 items-center justify-center">
            {/* Left Column - Videos */}
            <div className="space-y-4">
              <VideoCard title="Original Video" videoSrc="/path/to/original-video.mp4" />
              <VideoCard title="Annotated Video" videoSrc="/path/to/annotated-video.mp4" />
            </div>

            {/* Middle Column - Quality Chart, Total Plants, and Above Threshold */}
            <div className="space-y-4 flex flex-col items-center">
              {/* Quality Chart */}
              <CircularProgress value={30 / 50} label="Quality Above Threshold" size="large" />

              {/* Total Plants and Above Threshold */}
              {[
                { label: 'Total Plants', value: 50 },
                { label: 'Above Threshold', value: 30 },
              ].map((item, index) => (
                <div key={index} className="flex w-full">
                  <div className="bg-white/30 text-white px-4 py-2 rounded-l-lg font-semibold w-1/2">
                    {item.label}:
                  </div>
                  <div className="bg-white/20 text-white px-4 py-2 rounded-r-lg w-1/2">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column - Average Circularity, Eccentricity, Perimeter, Area, Collection Date, and GPS Location */}
            <div className="space-y-4">
              {/* Average Circularity and Eccentricity */}
              <div className="flex items-center justify-center space-x-4">
                <CircularProgress value={0.85} label="Average Circularity" size="small" />
                <CircularProgress value={0.45} label="Average Eccentricity" size="small" />
              </div>

              {/* Average Perimeter and Average Area */}
              {[
                { label: 'Average Perimeter', value: '25.6 cm' },
                { label: 'Average Area', value: '15.4 cm²' },
              ].map((item, index) => (
                <div key={index} className="flex">
                  <div className="bg-white/30 text-white px-4 py-2 rounded-l-lg font-semibold w-1/2">
                    {item.label}:
                  </div>
                  <div className="bg-white/20 text-white px-4 py-2 rounded-r-lg w-1/2">
                    {item.value}
                  </div>
                </div>
              ))}

              {/* Collection Date and GPS Location */}
              {[
                { label: 'Collection Date', value: '2024-10-03' },
                { label: 'GPS Location', value: '40.12°N, 111.12°W' },
              ].map((item, index) => (
                <div key={index} className="flex">
                  <div className="bg-white/30 text-white px-4 py-2 rounded-l-lg font-semibold w-1/2">
                    {item.label}:
                  </div>
                  <div className="bg-white/20 text-white px-4 py-2 rounded-r-lg w-1/2">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Plant Details Cards */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
          {[...Array(4)].map((_, idx) => (
            <PlantDetailCard
              key={idx}
              id="1234"
              image="https://cdn.mos.cms.futurecdn.net/ENHKamYXrusiMeT5Yie5ei.jpg"
              circularity={0.85}
              eccentricity={0.45}
              area="1345"
              perimeter="234"
              confidenceThreshold={0.95}
              appearance="Healthy"
              rating="Good"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
