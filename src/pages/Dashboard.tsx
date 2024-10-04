import React, { useState } from 'react';
import VideoCard from '../components/VideoCard';
import PlantDetailCard from '../components/PlantDetailCard';
import CircularProgress from '../components/CircularProgress';
import Filters from '../components/Filters';

interface Plant {
  id: string;
  image: string;
  circularity: number;
  eccentricity: number;
  area: string;
  perimeter: string;
  confidenceThreshold: number;
  appearance: string;
  rating: string;
}

const Dashboard: React.FC = () => {
  // State to store the list of plants
  const [plants] = useState<Plant[]>(
    [...Array(10)].map((_, idx) => ({
      id: `1234-${idx}`,
      image: 'https://cdn.mos.cms.futurecdn.net/ENHKamYXrusiMeT5Yie5ei.jpg',
      circularity: 0.85,
      eccentricity: 0.45,
      area: '1345',
      perimeter: '234',
      confidenceThreshold: 0.95,
      appearance: 'Healthy',
      rating: 'Good',
    }))
  );

  // State to store filter criteria, including min and max for ranges
  const [filters, setFilters] = useState<{
    id?: string;
    appearance?: string;
    rating?: string;
    circularityMin?: number;
    circularityMax?: number;
    eccentricityMin?: number;
    eccentricityMax?: number;
    confidenceThresholdMin?: number;
    confidenceThresholdMax?: number;
  }>({});

  // Handle filter input change for text and dropdowns
  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Handle range filter change for dual-sided ranges
  const handleRangeChange = (name: string, min: number, max: number) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [`${name}Min`]: min,
      [`${name}Max`]: max,
    }));
  };

  // Filter the list of plants based on the filter criteria
  const filteredPlants = plants.filter((plant) => {
    return (
      (!filters.id || plant.id.includes(filters.id)) &&
      (!filters.appearance || plant.appearance === filters.appearance) &&
      (!filters.rating || plant.rating === filters.rating) &&
      (!filters.circularityMin ||
        (plant.circularity >= filters.circularityMin &&
          plant.circularity <= (filters.circularityMax ?? 1))) &&
      (!filters.eccentricityMin ||
        (plant.eccentricity >= filters.eccentricityMin &&
          plant.eccentricity <= (filters.eccentricityMax ?? 1))) &&
      (!filters.confidenceThresholdMin ||
        (plant.confidenceThreshold >= filters.confidenceThresholdMin &&
          plant.confidenceThreshold <= (filters.confidenceThresholdMax ?? 1)))
    );
  });

  return (
    <div className="p-4 min-h-full">
      <div className="container mx-auto space-y-6">
        {/* Large Information Card */}
        <div className="rounded-lg shadow-md p-6 bg-white/10 relative">
          {/* Plant Name Tag on the Top Left */}
          <div className="absolute top-0 left-0 bg-gray-200 text-black px-4 py-2 font-semibold text-xl">
            Azalea
          </div>

          {/* Bed, Download Button */}
          <div className="flex justify-between items-center mb-6 pt-10">
            <div className="px-4 py-2 bg-gray-300 rounded-lg font-semibold text-3xl text-black">
              Bed: A-12
            </div>
            <div className="flex space-x-4">
              <button className="px-4 py-2 bg-blue-500 rounded-lg transition hover:bg-blue-700">
                Download XLSX
              </button>
            </div>
          </div>

          {/* Three Columns Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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
              <div className="flex items-center space-x-4">
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

        {/* Filter Section */}
        <Filters filters={filters} handleFilterChange={handleFilterChange} handleRangeChange={handleRangeChange} />

        {/* Plant Details Cards */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
          {filteredPlants.map((plant) => (
            <PlantDetailCard key={plant.id} {...plant} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
