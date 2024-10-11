import AnalysisCard from '../components/AnalysisCard';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Summary } from '../types';

interface SummaryCardsProps {
    scrollLeft: (state: any) => void;
    scrollRight: (state: any) => void;
    scrollContainerRef:  React.RefObject<HTMLDivElement>;
    handleAnalysisClick: (state: any) => void;
    filteredSummaries: Summary[];
    selectedAnalysis: any;
}


const SummaryCards: React.FC<SummaryCardsProps> = ({scrollLeft, scrollRight, scrollContainerRef, handleAnalysisClick, filteredSummaries, selectedAnalysis}) => {
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