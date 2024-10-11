import AnalysisCard from '../components/AnalysisCard';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Summary } from '../types';
import React, { useRef, useEffect, useState } from 'react';
import { fetchSummaries } from '../services/api';

interface SummaryCardsProps {
    handleAnalysisClick: (state: any) => void;
    selectedAnalysis: any;
    searchTerm: string;
}


const SummaryCards: React.FC<SummaryCardsProps> = ({handleAnalysisClick, selectedAnalysis, searchTerm}) => {
    const [summaries, setSummaries] = useState<Summary[]>([]);
    const filteredSummaries = summaries.filter((summary) => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return (
          summary.bed_number.toLowerCase().includes(lowerCaseSearchTerm) ||
          'Azalea'.toLowerCase().includes(lowerCaseSearchTerm)
        );
      });

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


    const scrollContainerRef = useRef<HTMLDivElement>(null);
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
    
    return (
        <>
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
                            plantName={summary.plants.join(' ')}
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
        </>
    )
}

export default SummaryCards