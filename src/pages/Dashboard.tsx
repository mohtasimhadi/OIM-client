import React, { useState, useEffect } from 'react';
import VideoCard from '../components/VideoCard';
import PlantDetailCard from '../components/PlantDetailCard';
import CircularProgress from '../components/CircularProgress';
import Filters from '../components/Filters';
import AnalysisCard from '../components/AnalysisCard';
import { getAverageValue } from '../services/calculations';

interface Plant {
  track_id: string;
  image: string;
  circularity: number;
  eccentricity: number;
  area: string;
  perimeter: string;
  confidence: number;
  appearance: string;
  rating: string;
}

interface Summary {
  video_id: string;
  bed_number: string;
  collection_date: string;
}

interface AnalysisData {
  video_id: string;
  analysis: {
    track_data: Plant[];
    above_threshold: number;
    video_id: string;
  };
  collection_date: string;
}

const Dashboard: React.FC = () => {
  // State for filters
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

  // State for summaries
  const [summaries, setSummaries] = useState<Summary[]>([]);

  // State for selected analysis
  const [selectedAnalysis, setSelectedAnalysis] = useState<Summary | null>(null);

  // State for analysis data
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);

  // Fetch summaries on component mount
  useEffect(() => {
    fetch('http://localhost:8080/data/summaries')
      .then((response) => response.json())
      .then((data) => setSummaries(data))
      .catch((error) => console.error('Error fetching summaries:', error));
  }, []);

  // Handler for clicking on an AnalysisCard
  const handleAnalysisClick = (summary: Summary) => {
    setSelectedAnalysis(summary); // Set the selected analysis

    // Construct the API URL using the video_id from the summary
    const apiUrl = `http://localhost:8080/data/${encodeURIComponent(summary.video_id)}`;

    // Fetch additional data from the constructed API
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setAnalysisData(data); // Update with fetched data
      })
      .catch((error) => console.error('Error fetching analysis data:', error));
  };

  // Handler for filter input changes
  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Handler for range filter changes
  const handleRangeChange = (name: string, min: number, max: number) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [`${name}Min`]: min,
      [`${name}Max`]: max,
    }));
  };

  // Derive plants from analysisData if available
  const plants: Plant[] = analysisData?.analysis?.track_data ?? [];

  // Filter the list of plants based on filters
  const filteredPlants = plants.filter((plant) => {
    return (
      (!filters.id || plant.track_id.includes(filters.id)) &&
      (!filters.appearance || plant.appearance === filters.appearance) &&
      (!filters.rating || plant.rating === filters.rating) &&
      (!filters.circularityMin ||
        (plant.circularity >= filters.circularityMin &&
          plant.circularity <= (filters.circularityMax ?? 1))) &&
      (!filters.eccentricityMin ||
        (plant.eccentricity >= filters.eccentricityMin &&
          plant.eccentricity <= (filters.eccentricityMax ?? 1))) &&
      (!filters.confidenceThresholdMin ||
        (plant.confidence >= filters.confidenceThresholdMin &&
          plant.confidence <= (filters.confidenceThresholdMax ?? 1)))
    );
  });

  return (
    <div className="p-4 min-h-full">
      <div className="container mx-auto space-y-6">
        {/* Analysis Overview Cards */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {summaries.map((summary) => (
            <AnalysisCard
              key={summary.video_id}
              videoId={summary.video_id}
              bedNumber={summary.bed_number}
              collectionDate={summary.collection_date}
              onClick={() => handleAnalysisClick(summary)} // Handle click event
            />
          ))}
        </div>

        {/* Only display the dashboard after analysis data is fetched */}
        {analysisData && analysisData.analysis ? (
          <>
            {/* Large Information Card */}
            <div className="rounded-lg shadow-md p-6 bg-white/10 relative">
              <div className="absolute top-0 left-0 bg-gray-200 text-black px-4 py-2 font-semibold text-xl">
                Azalea | Bed: {selectedAnalysis?.bed_number}
              </div>
              <button className="absolute top-0 right-0 px-4 py-2 bg-blue-500 rounded-bl-lg rounded-tr-lg font-semibold transition hover:bg-blue-700">
                Download XLSX
              </button>

              {/* Dashboard content */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 pt-12">
                {/* Left Column (1/3 Size) */}
                <div className="col-span-1 space-y-4">
                  {/* Circular Progress Section */}
                  <div className="flex flex-col space-y-4 items-center justify-center">
                    <div className="flex items-center space-x-4 justify-around">
                      <CircularProgress
                        value={
                          plants.length > 0
                            ? analysisData.analysis.above_threshold / plants.length
                            : 0
                        }
                        label="Quality Above Threshold"
                        size="large"
                      />
                      <CircularProgress
                        value={getAverageValue(plants, 'circularity')}
                        label="Average Circularity"
                        size="large"
                      />
                      <CircularProgress
                        value={getAverageValue(plants, 'eccentricity')}
                        label="Average Eccentricity"
                        size="large"
                      />
                    </div>

                    {/* Additional Information */}

                    {
                      [
                        {
                          label: 'Total Plants',
                          value: plants.length,
                        },
                        {
                          label: 'Above Threshold',
                          value: analysisData.analysis.above_threshold,
                        },
                        {
                          label: 'Average Perimeter',
                          value: getAverageValue(plants, 'perimeter'),
                        },
                        {
                          label: 'Average Area',
                          value: getAverageValue(plants, 'area'),
                        },
                        {
                          label: 'Collection Date',
                          value: analysisData.collection_date,
                        },
                        {
                          label: 'GPS Location',
                          value: 'N/A', // Replace with actual GPS data if available
                        },
                      ].reduce<{ label: string; value: string | number }[][]>((result, value, index, array) => {
                        if (index % 2 === 0) {
                          result.push(array.slice(index, index + 2));
                        }
                        return result;
                      }, []).map((pair, rowIndex) => (
                        <div key={rowIndex} className="flex w-full mb-2">
                          {pair.map((item, colIndex) => (
                            <div key={colIndex} className="flex w-1/2 pr-2">
                              <div className="bg-white/30 text-white px-4 py-2 rounded-l-lg font-semibold w-1/2">
                                {item.label}:
                              </div>
                              <div className="bg-white/20 text-white px-4 py-2 rounded-r-lg w-1/2 flex items-center overflow-hidden">
                                {item.value}
                              </div>
                            </div>
                          ))}
                        </div>
                      ))
                    }





                  </div>
                </div>

                {/* Right Column (2/3 Size) */}
                <div className="col-span-2 space-y-4 flex flex-col items-center justify-center">
                  {/* Video Cards Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                    <VideoCard
                      title="Original Video"
                      videoSrc={`http://localhost:8000/video/view/${analysisData.video_id}`}
                    />
                    <VideoCard
                      title="Annotated Video"
                      videoSrc={`http://localhost:8000/video/view/${analysisData.analysis.video_id}`}
                    />
                  </div>
                </div>
              </div>
            </div>


            {/* Filter Section */}
            <Filters
              filters={filters}
              handleFilterChange={handleFilterChange}
              handleRangeChange={handleRangeChange}
            />

            {/* Plant Details Cards */}
            <div className="grid gap-6 grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
              {filteredPlants.map((plant) => (
                <PlantDetailCard key={plant.track_id} {...plant} />
              ))}
            </div>
          </>
        ) : (
          // Optional: Display a loading indicator or message when analysisData is not yet available
          selectedAnalysis && (
            <div className="flex justify-center items-center mt-10">
              <p className="text-gray-500">Loading analysis data...</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Dashboard;
