import React, { useState, useEffect } from 'react';
import PlantDetailCard from '../components/PlantDetailCard';
import { getAverageValue } from '../services/calculations';
import { fetchAnalysisData, deleteAnalysis } from '../services/api';
import { Plant, Summary, AnalysisData } from '../types';
import CircularityAndEccentricityLineGraph from '../components/CircularityAndEccentricityLineGraph';
import TotalOverviewCard from '../components/TotalOverviewCard';
import AreaAndPerimeterLineGraph from '../components/AreaAndPerimeterLineGraph';
import SummaryCards from '../components/SummaryCards';
import VideoDash from '../components/VideoDash';
import TotalOverviewCardXL from '../components/TotalOverViewCardXL';
import { IoCloudDownloadOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { TbAnalyze } from "react-icons/tb";
import { toast } from 'react-toastify';
import LoadingModal from '../components/LoadingModal';
import { ToastContainer } from 'react-toastify';

interface DashboardProps {
  searchTerm: string;
}

const Dashboard: React.FC<DashboardProps> = ({ searchTerm }) => {

  const [selectedAnalysis, setSelectedAnalysis] = useState<Summary | null>(null);
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [plants, setPlants] = useState<Plant[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedAnalysis) {
      const getAnalysisData = async () => {
        try {
          const data = await fetchAnalysisData(selectedAnalysis.video_id);
          setAnalysisData(data);
          setPlants(data?.analysis?.track_data)
        } catch (error) {
          console.error('Error fetching analysis data:', error);
          setSelectedAnalysis(null)
          toast("Couldn't fetch data!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
        }
      };

      getAnalysisData();
    }
  }, [selectedAnalysis]);

  const handleSummaryClick = (summary: Summary) => {
    setAnalysisData(null)
    setSelectedAnalysis(summary);
  };

  const handleDeleteAnalysis = async (videoID: string | any) => {
    setIsLoading(true);
    try {
      await deleteAnalysis(videoID);
      setSelectedAnalysis(null);
      setAnalysisData(null);
      toast.success("Analysis deleted successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    } catch (error) {
      toast.error("Failed to delete analysis.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 min-h-full">
      <ToastContainer/>
      <LoadingModal show={isLoading} message='Deleting analysis...' />
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
                    <TotalOverviewCard title='Average Area' value={getAverageValue(analysisData?.analysis?.track_data, 'area')} color1='#3f6212' color2='#65a30d' color3='#a3e635' />
                    <TotalOverviewCard title='Average Perimeter' value={getAverageValue(analysisData?.analysis?.track_data, 'perimeter')} color1='#166534' color2='#16a34a' color3='#4ade80' />
                    <TotalOverviewCard title='Average Circularity' value={parseFloat((getAverageValue(analysisData?.analysis?.track_data, 'circularity') * 100).toFixed(2)) + "%"} color1='#155e75' color2='#0284c7' color3='#38bdf8'  />
                    <TotalOverviewCard title='Average Eccentricity' value={parseFloat((getAverageValue(analysisData?.analysis?.track_data, 'eccentricity') * 100).toFixed(2)) + "%"} color1='#3730a3' color2='#4f46e5' color3='#818cf8' />
                  </div>
                </div>

              </div>


              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full rounded-lg pt-4'>
                <div className='flex flex-col'>
                  {/* Grid layout for the analysis header and buttons */}
                  <div className='grid grid-cols-1 md:grid-cols-5 gap-4'>
                    {/* Left section: Grade info */}
                    <div className='col-span-2 flex items-center justify-center bg-gradient-to-r from-red-800 via-red-600 to-red-400 w-full'>
                      <div className='space-y-4 w-full p-4'>
                        <p className='text-4xl font-semibold'>Grade D</p>
                        <p>Low quality bed</p>
                      </div>
                    </div>

                    {/* Right section: Action buttons */}
                    <div className='col-span-3 flex items-center justify-center w-full bg-black/20'>
                      <div className='flex flex-row space-x-4'>
                        {/* Analyze Again Button */}
                        <button className='flex flex-col items-center justify-center rounded-lg m-2 p-4 hover:bg-white/20'>
                          <TbAnalyze size={32} />
                          <p className='text-xs'>Analyze Again</p>
                        </button>

                        {/* Delete Analysis Button */}
                        <button className='flex flex-col items-center justify-center rounded-lg m-2 p-4 hover:bg-white/20' onClick={() => handleDeleteAnalysis(selectedAnalysis?.video_id)}>
                          <MdDeleteOutline size={32} />
                          <p className='text-xs'>Delete Analysis</p>
                        </button>

                        {/* Download XLSX Button */}
                        <button className='flex flex-col items-center justify-center rounded-lg m-2 p-4 hover:bg-white/20'>
                          <IoCloudDownloadOutline size={32} />
                          <p className='text-xs'>Download XLSX</p>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Spacer */}
                  <p className='p-2'></p>

                  {/* Circularity and Eccentricity Line Graph */}
                  <CircularityAndEccentricityLineGraph data={analysisData?.analysis?.track_data} />
                </div>

                <div className='flex flex-col'>
                  <AreaAndPerimeterLineGraph data={analysisData?.analysis?.track_data} graph='area' />
                  <p className='p-2' />
                  <AreaAndPerimeterLineGraph data={analysisData?.analysis?.track_data} graph='perimeter' />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-4 pt-4">

                <div className="col-span-1 space-y-4 flex flex-col items-center justify-around bg-black/15 p-4 rounded-lg">
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
