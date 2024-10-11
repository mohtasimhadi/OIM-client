import React, { useState, useEffect } from 'react';
import PlantDetailCard from '../components/PlantDetailCard';
import { getAverageValue } from '../services/calculations';
import { fetchAnalysisData } from '../services/api';
import { Plant, Summary, AnalysisData } from '../types';
import CircularityAndEccentricityLineGraph from '../components/CircularityAndEccentricityLineGraph';
import TotalOverviewCard from '../components/TotalOverviewCard';
import AreaAndPerimeterLineGraph from '../components/AreaAndPerimeterLineGraph';
import SummaryCards from '../components/SummaryCards';
import VideoDash from '../components/VideoDash';
import TotalOverviewCardXL from '../components/TotalOverViewCardXL';

interface DashboardProps {
  searchTerm: string;
}

const Dashboard: React.FC<DashboardProps> = ({ searchTerm }) => {

  const [selectedAnalysis, setSelectedAnalysis] = useState<Summary | null>(null);
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [plants, setPlants] = useState<Plant[]>([]);

  useEffect(() => {
    if (selectedAnalysis) {
      const getAnalysisData = async () => {
        try {
          const data = await fetchAnalysisData(selectedAnalysis.video_id);
          setAnalysisData(data);
          setPlants(data?.analysis?.track_data)
        } catch (error) {
          console.error('Error fetching analysis data:', error);
        }
      };

      getAnalysisData();
    }
  }, [selectedAnalysis]);

  const handleSummaryClick = (summary: Summary) => {
    setAnalysisData(null)
    setSelectedAnalysis(summary);
  };

  return (
    <div className="p-4 min-h-full">
      <div className="container mx-auto space-y-6">
        <SummaryCards
          searchTerm={searchTerm}
          handleAnalysisClick={handleSummaryClick}
          selectedAnalysis={selectedAnalysis} />

        {/* Only display the dashboard after analysis data is fetched */}
        {analysisData ? (
          <>
            <div className="rounded-lg shadow-md p-6 bg-white/10 relative">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                <div className="col-span-1 space-y-4">
                  <TotalOverviewCardXL bed_number={analysisData?.bed_number} plants={analysisData?.plants?.join(' ') || ''} collection_date={analysisData?.collection_date} total_plants={analysisData?.analysis?.track_data?.length} />
                </div>
                <div className="col-span-2 space-y-4 flex flex-col items-center justify-around">
                  <div className='grid grid-cols-2 md:grid-cols-4 gap-4 w-full'>
                    <TotalOverviewCard title='Average Area' value={getAverageValue(analysisData?.analysis?.track_data, 'area')} color='#808700' />
                    <TotalOverviewCard title='Average Perimeter' value={getAverageValue(analysisData?.analysis?.track_data, 'perimeter')} color='#00874c' />
                    <TotalOverviewCard title='Average Circularity' value={parseFloat((getAverageValue(analysisData?.analysis?.track_data, 'circularity') * 100).toFixed(2)) + "%"} color='#000087' />
                    <TotalOverviewCard title='Average Eccentricity' value={parseFloat((getAverageValue(analysisData?.analysis?.track_data, 'eccentricity') * 100).toFixed(2)) + "%"} color='#500087' />
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


            <div className="grid gap-6 grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
              {plants.map((plant) => (
                <PlantDetailCard key={plant.track_id} {...plant} />
              ))}
            </div>
          </>
        ) : (
          selectedAnalysis && (
            <div className="flex flex-col justify-center items-center mt-10 space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
              <p className="text-xl font-medium text-white">Loading analysis data...</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Dashboard;
