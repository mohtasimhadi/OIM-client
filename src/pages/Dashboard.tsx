import React, { useState, useEffect } from 'react';
import PlantDetailCard from '../components/PlantDetailCard';
import Filters from '../components/Filters';
import { getAverageValue } from '../services/calculations';
import { fetchAnalysisData } from '../services/api';
import { Plant, Summary, AnalysisData } from '../types';
import { PiPottedPlantBold } from "react-icons/pi";
import { MdOutlineDateRange } from "react-icons/md";
import CircularityAndEccentricityLineGraph from '../components/CircularityAndEccentricityLineGraph';
import TotalOverviewCard from '../components/TotalOverviewCard';
import { IoCloudDownloadOutline } from "react-icons/io5";
import AreaAndPerimeterLineGraph from '../components/AreaAndPerimeterLineGraph';
import SummaryCards from '../components/SummaryCards';
import VideoDash from '../components/VideoDash';

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

  const [selectedAnalysis, setSelectedAnalysis] = useState<Summary | null>(null);
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);

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


  return (
    <div className="p-4 min-h-full">
      <div className="container mx-auto space-y-6">
        <SummaryCards
          searchTerm={searchTerm}
          handleAnalysisClick={handleAnalysisClick}
          selectedAnalysis={selectedAnalysis} />

        {/* Only display the dashboard after analysis data is fetched */}
        {analysisData && analysisData.analysis && analysisData.video_id ? (
          <>
            <div className="rounded-lg shadow-md p-6 bg-white/10 relative">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="col-span-1 space-y-4">
                  <div className='w-full flex bg-gradient-to-r from-white-15 via-white-15 to-black-10 rounded-lg hover:scale-105'>
                    <div>
                      <div className="flex items-center pt-4 pl-4 w-full font-semibold text-3xl">
                        {selectedAnalysis?.bed_number} | {selectedAnalysis?.plants?.join(' ')}
                      </div>
                      <div className='flex'>
                        <div className='p-4 flex items-center justify-center'>
                          <div className='mr-2' ><MdOutlineDateRange size={32} /></div>
                          <div>
                            <p className='font-semibold text-xl'>{analysisData?.collection_date}</p>
                            <p>Collection Date</p>
                          </div>
                        </div>
                        <div className='p-4 flex items-center justify-center'>
                          <div className='mr-2' ><PiPottedPlantBold size={32} /></div>
                          <div>
                            <p className='font-semibold text-xl'>{analysisData?.analysis?.track_data?.length}</p>
                            <p>Total Plants</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='flex items-center justify-center ml-4'>
                      <button className='flex items-center justify-center space-x-2 hover:bg-white/15 rounded-lg p-4'>
                        <IoCloudDownloadOutline size={48} />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-span-2 space-y-4 flex flex-col items-center justify-around">
                  <div className='grid grid-cols-2 md:grid-cols-4 gap-4 w-full'>
                    <TotalOverviewCard title='Average Area' value={getAverageValue(plants, 'area')} color='#808700' />
                    <TotalOverviewCard title='Average Perimeter' value={getAverageValue(plants, 'perimeter')} color='#00874c' />
                    <TotalOverviewCard title='Average Circularity' value={parseFloat((getAverageValue(plants, 'circularity') * 100).toFixed(2)) + "%"} color='#000087' />
                    <TotalOverviewCard title='Average Eccentricity' value={parseFloat((getAverageValue(plants, 'eccentricity') * 100).toFixed(2)) + "%"} color='#500087' />
                  </div>
                </div>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full rounded-lg pt-4'>
                <CircularityAndEccentricityLineGraph data={analysisData?.analysis?.track_data} />
                <div className='flex flex-col'>
                  <AreaAndPerimeterLineGraph data={analysisData?.analysis?.track_data} graph='area' />
                  <p className='p-2' />
                  <AreaAndPerimeterLineGraph data={analysisData?.analysis?.track_data} graph='perimeter' />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 pt-12">
                <div className="col-span-1 space-y-4">
                  <div className='w-full flex'>
                    <div className='w-1/2 bg-black/30 rounded-lg p-4'>
                      Grade
                    </div>
                    <div className='w-1/2 bg-black/15 rounded-lg p-4'>
                      A
                    </div>
                  </div>
                </div>
                <div className="col-span-2 space-y-4 flex flex-col items-center justify-around bg-black/15 p-4 rounded-lg">
                  <VideoDash video={analysisData.video_id} annotatedVideo={analysisData.analysis.video_id} />
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
