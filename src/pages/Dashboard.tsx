import React from 'react';
import VideoCard from '../components/VideoCard';
import QualityChart from '../components/QualityChart';
import PlantDetailCard from '../components/PlantDetailCard';

const Dashboard: React.FC = () => {
  const aboveThreshold = 90;

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 pt-10">
            <VideoCard title="Original Video" videoSrc="/path/to/original-video.mp4" />
            <VideoCard title="Annotated Video" videoSrc="/path/to/annotated-video.mp4" />
          </div>

          {/* Bed and Download Button in Same Row */}
          <div className="flex justify-between items-center mb-4">
            <div className="px-4 py-2 bg-gray-300 rounded-lg font-semibold text-3xl text-black">
              Bed: A-12
            </div>
            <div className="flex space-x-4">
              <button className="px-4 py-2 bg-green-500 rounded-lg transition hover:bg-green-700">
                Download CSV
              </button>
              <button className="px-4 py-2 bg-blue-500 rounded-lg transition hover:bg-blue-700">
                Download XLSX
              </button>
            </div>
          </div>

          {/* Collection Information, Average Values, and Circular Chart */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <QualityChart value={aboveThreshold} />
            <div className="space-y-2">
              {[
                { label: 'Collection Date', value: '2024-10-03' },
                { label: 'GPS Location', value: '40.12°N, 111.12°W' },
                { label: 'Total Plants', value: '50' },
                { label: 'Above Threshold', value: '30' },
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
            <div className="space-y-2">
              {[
                { label: 'Average Circularity', value: '0.85' },
                { label: 'Average Eccentricity', value: '0.45' },
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
            </div>
          </div>
        </div>

        {/* Plant Details Cards */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
          {[...Array(4)].map((_, idx) => (
            <PlantDetailCard
              key={idx}
              id = '1234'
              image="https://cdn.mos.cms.futurecdn.net/ENHKamYXrusiMeT5Yie5ei.jpg"
              circularity={.85}
              eccentricity={.45}
              area='1345'
              perimeter='234'
              confidenceThreshold={0.95}
              appearance='Healthy'
              rating='Good'
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;