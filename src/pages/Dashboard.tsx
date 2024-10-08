import React, { useState, useEffect, useRef } from 'react';
import VideoCard from '../components/VideoCard';
import PlantDetailCard from '../components/PlantDetailCard';
import CircularProgress from '../components/CircularProgress';
import Filters from '../components/Filters';
import AnalysisCard from '../components/AnalysisCard';
import { getAverageValue } from '../services/calculations';
import { fetchSummaries, fetchAnalysisData } from '../services/api';
import { Plant, Summary, AnalysisData } from '../types';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { PiPottedPlantBold } from "react-icons/pi";
import { SiGooglesheets } from "react-icons/si";
import { SiNamecheap } from "react-icons/si";

interface DashboardProps {
  searchTerm: string;
}

const Dashboard: React.FC<DashboardProps> = ({ searchTerm }) => {
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

  const [summaries, setSummaries] = useState<Summary[]>([]);
  const [selectedAnalysis, setSelectedAnalysis] = useState<Summary | null>(null);
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getSummaries = async () => {
      try {
        const data = await fetchSummaries();
        setSummaries(data);
      } catch (error) {
        console.error('Error fetching summaries:', error);
      }
    };

    getSummaries();
  }, []);

  useEffect(() => {
    if (selectedAnalysis) {
      const getAnalysisData = async () => {
        try {
          const data = await fetchAnalysisData(selectedAnalysis.video_id);
          setAnalysisData(data);
        } catch (error) {
          console.error('Error fetching analysis data:', error);
        }
      };

      getAnalysisData();
    }
  }, [selectedAnalysis]);

  const handleAnalysisClick = (summary: Summary) => {
    setSelectedAnalysis(summary);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleRangeChange = (name: string, min: number, max: number) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [`${name}Min`]: min,
      [`${name}Max`]: max,
    }));
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: 'smooth',
      });
    }
  };

  const plants: Plant[] = analysisData?.analysis?.track_data ?? [];
  
  const filteredPlants = plants.filter((plant) => {
    return (
      (!filters.id || plant.track_id.includes(filters.id)) &&
      (!filters.appearance || plant.appearance === filters.appearance) &&
      (!filters.rating || plant.rating === filters.rating) &&
      (!filters.circularityMin ||
        (plant.circularity >= filters.circularityMin &&
          plant.circularity <= (filters.circularityMax ?? 100))) &&
      (!filters.eccentricityMin ||
        (plant.eccentricity >= filters.eccentricityMin &&
          plant.eccentricity <= (filters.eccentricityMax ?? 100))) &&
      (!filters.confidenceThresholdMin ||
        (plant.confidence >= filters.confidenceThresholdMin &&
          plant.confidence <= (filters.confidenceThresholdMax ?? 100)))
    );
  });

  // Filter summaries based on search term for plant name and bed number
  const filteredSummaries = summaries.filter((summary) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      summary.bed_number.toLowerCase().includes(lowerCaseSearchTerm) ||
      'Azalea'.toLowerCase().includes(lowerCaseSearchTerm) // Replace 'Azalea' with dynamic plant name if needed
    );
  });

  return (
    <div className="p-4 min-h-full">
      <div className="container mx-auto space-y-6">
        {/* Scrollable Analysis Overview Cards */}
        <div className="relative flex items-center justify-center">
          {/* Left Arrow */}
          <button
            onClick={scrollLeft}
            className="bg-gray-200 hover:bg-gray-300 p-2 rounded-full z-10 text-black"
          >
            <FaChevronLeft />
          </button>

          {/* Scrollable Container */}
          <div ref={scrollContainerRef} className="flex gap-4 overflow-hidden">
            {filteredSummaries.map((summary) => (
              <AnalysisCard
                key={summary.video_id}
                plantName="Azalea" // Adjust this dynamically if needed
                bedNumber={summary.bed_number}
                collectionDate={summary.collection_date}
                onClick={() => handleAnalysisClick(summary)}
              />
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={scrollRight}
            className="bg-gray-200 hover:bg-gray-300 p-2 rounded-full z-10 text-black"
          >
            <FaChevronRight />
          </button>
        </div>

        {/* Please select message */}
        {!selectedAnalysis && (
          <div className="flex justify-center items-center h-40 text-gray-500 text-xl">
            Please select a bed to view analysis.
          </div>
        )}

        {/* Only display the dashboard after analysis data is fetched */}
        {analysisData && analysisData.analysis && analysisData.video_id && selectedAnalysis ? (
          <>
            <div className="rounded-lg shadow-md p-6 bg-white/10 relative">
              <div className="flex items-center absolute top-0 left-0 bg-gray-200 text-black px-4 py-2 font-semibold text-xl rounded-tl-lg rounded-br-lg">
              <PiPottedPlantBold className='mr-2'/> Azalea
              </div>
              <button className="flex items-center absolute top-0 right-0 px-4 py-2 bg-blue-500 rounded-bl-lg rounded-tr-lg font-semibold transition hover:bg-blue-700">
                <SiGooglesheets className='mr-2' /> Download XLSX
              </button>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 pt-12">
                <div className="col-span-1 space-y-4">
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
                        label="Mean Circularity"
                        size="large"
                      />
                      <CircularProgress
                        value={getAverageValue(plants, 'eccentricity')}
                        label="Mean Eccentricity"
                        size="large"
                      />
                    </div>
                    {[{ label: 'Total Plants', value: plants.length },
                      { label: 'Above Threshold', value: analysisData.analysis.above_threshold },
                      { label: 'Mean Perimeter', value: getAverageValue(plants, 'perimeter') },
                      { label: 'Mean Area', value: getAverageValue(plants, 'area') },
                      { label: 'Collection Date', value: analysisData.collection_date },
                      { label: 'GPS Location', value: 'N/A' }]
                      .reduce<{ label: string; value: string | number }[][]>(
                        (result, value, index, array) => {
                          if (index % 2 === 0) {
                            result.push(array.slice(index, index + 2));
                          }
                          return result;
                        },
                        []
                      )
                      .map((pair, rowIndex) => (
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
                      ))}
                  </div>
                </div>

                <div className="col-span-2 space-y-4 flex flex-col items-center justify-around">
                  <div className="flex items-center  justify-center w-full bg-white/15 px-4 py-2 font-semibold text-3xl text-center rounded-lg">
                  <SiNamecheap className='mr-2'/> {selectedAnalysis?.bed_number}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full bg-white/15 rounded-lg p-4">
                    <VideoCard
                      key={`${analysisData.video_id}`}
                      title="Original Video"
                      videoID={analysisData.video_id}
                    />
                    <VideoCard
                      key={`${analysisData.analysis.video_id}`}
                      title="Annotated Video"
                      videoID={analysisData.analysis.video_id}
                    />
                  </div>
                </div>
              </div>
            </div>

            <Filters
              filters={filters}
              handleFilterChange={handleFilterChange}
              handleRangeChange={handleRangeChange}
            />

            <div className="grid gap-6 grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
              {filteredPlants.map((plant) => (
                <PlantDetailCard key={plant.track_id} {...plant} />
              ))}
            </div>
          </>
        ) : (
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
