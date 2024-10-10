import React, { useState, useEffect, useRef } from 'react';
import VideoCard from '../components/VideoCard';
import PlantDetailCard from '../components/PlantDetailCard';
import Filters from '../components/Filters';
import AnalysisCard from '../components/AnalysisCard';
import { getAverageValue } from '../services/calculations';
import { fetchSummaries, fetchAnalysisData } from '../services/api';
import { Plant, Summary, AnalysisData } from '../types';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { PiPottedPlantBold } from "react-icons/pi";
import { FaPlay } from "react-icons/fa";
import { FaPause, FaStop } from 'react-icons/fa6';
import ReactPlayer from 'react-player';
import { LiaDrawPolygonSolid } from "react-icons/lia";
import { IoShapesOutline } from "react-icons/io5";
import { MdOutlineDateRange } from "react-icons/md";
import { PiGpsFixFill } from "react-icons/pi";
import { PiPottedPlantLight } from "react-icons/pi";
import { MdAddchart } from "react-icons/md";
import CircularityAndEccentricityLineGraph from '../components/DataChart';
import TotalOverviewCard from '../components/TotalOverviewCard';
import { IoCloudDownloadOutline } from "react-icons/io5";

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

  const playerRefOriginal = useRef<ReactPlayer | null>(null); // Original video ref
  const playerRefAnnotated = useRef<ReactPlayer | null>(null); // Annotated video ref
  const [playing, setPlaying] = useState(false); // Controls play/pause state
  const [progress, setProgress] = useState(0); // Tracks progress

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

  // Play/Pause/Stop video controls

  const togglePlayPause = () => {
    setPlaying(!playing); // Toggles between play and pause
  };

  const stopVideos = () => {
    setPlaying(false);
    if (playerRefOriginal.current && playerRefAnnotated.current) {
      playerRefOriginal.current.seekTo(0);
      playerRefAnnotated.current.seekTo(0);
      setProgress(0); // Reset progress
    }
  };

  const handleProgress = (state: any) => {
    setProgress(state.played); // Update progress bar
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = parseFloat(e.target.value);
    setProgress(newProgress);
    if (playerRefOriginal.current && playerRefAnnotated.current) {
      playerRefOriginal.current.seekTo(newProgress); // Sync both videos
      playerRefAnnotated.current.seekTo(newProgress);
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
      'Azalea'.toLowerCase().includes(lowerCaseSearchTerm)
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
              <div className="flex flex-row w-full">
                <div className="w-1/3 flex flex-col mr-2">
                  <div className='w-full flex bg-gradient-to-r from-white-15 via-white-15 to-black-10 rounded-lg'>
                    <div>
                      <div className="flex items-center pt-4 pl-4 w-full font-semibold text-3xl">
                        {selectedAnalysis?.bed_number}
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
                        <IoCloudDownloadOutline size={48}/>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="w-2/3 flex flex-col ml-2">
                  <div className='grid grid-cols-2 md:grid-cols-4 gap-4 w-full'>
                    <TotalOverviewCard title='Average Area' value={getAverageValue(plants, 'area')} />
                    <TotalOverviewCard title='Average Perimeter' value={getAverageValue(plants, 'perimeter')} />
                    <TotalOverviewCard title='Average Circularity' value={(getAverageValue(plants, 'circularity') * 100) + "%"} />
                    <TotalOverviewCard title='Average Eccentricity' value={(getAverageValue(plants, 'eccentricity') * 100) + "%"} />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 pt-12">
                <div className="col-span-1 space-y-4">
                  <div className="flex flex-col space-y-4 items-center justify-center">
                    {[{ icon: <PiPottedPlantLight className='mr-2' />, label: 'Total', value: plants.length },
                    { icon: <MdAddchart className='mr-2' />, label: 'Quality', value: analysisData.analysis.above_threshold },
                    { icon: <LiaDrawPolygonSolid className='mr-2' />, label: 'Perimeter', value: getAverageValue(plants, 'perimeter') },
                    { icon: <IoShapesOutline className='mr-2' />, label: 'Area', value: getAverageValue(plants, 'area') },
                    { icon: <MdOutlineDateRange className='mr-2' />, label: 'Date', value: analysisData.collection_date },
                    { icon: <PiGpsFixFill className='mr-2' />, label: 'Location', value: 'N/A' }]
                      .reduce<{ icon: React.ReactNode; label: string; value: string | number }[][]>(
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
                              <div className="flex items-center bg-white/30 text-white px-4 py-2 rounded-l-lg font-semibold w-1/2">
                                <div className='w-1/4' >{item.icon}</div>
                                <p >{item.label}:</p>
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

                  {/* Video Controls */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full bg-white/15 rounded-lg p-4">
                    <VideoCard
                      ref={playerRefOriginal}
                      key={`${analysisData.video_id}`}
                      title="Original Video"
                      videoID={analysisData.video_id}
                      playing={playing}
                      onProgress={handleProgress}
                    />
                    <VideoCard
                      ref={playerRefAnnotated}
                      key={`${analysisData.analysis.video_id}`}
                      title="Annotated Video"
                      videoID={analysisData.analysis.video_id}
                      playing={playing}
                      onProgress={handleProgress}
                    />
                  </div>
                  <div className="flex w-full items-center justify-center space-x-4 my-2">
                    <div className="flex items-center justify-center space-x-4 my-2">
                      <button
                        onClick={togglePlayPause}
                        className={`px-4 py-2 rounded-full bg-white/15 text-white`}>
                        {playing ? <FaPause /> : <FaPlay />}
                      </button>
                      <button onClick={stopVideos} className="px-4 py-2 rounded-full bg-white/15 text-white"><FaStop /></button>
                    </div>

                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={progress}
                      onChange={handleSeek}
                      className="w-full h-2 bg-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full rounded-lg p-4'>
                <CircularityAndEccentricityLineGraph data={analysisData?.analysis?.track_data} />
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
