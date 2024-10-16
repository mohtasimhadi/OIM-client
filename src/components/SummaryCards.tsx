import AnalysisCard from '../components/AnalysisCard';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Summary } from '../types';
import React, { useEffect, useState } from 'react';
import { fetchSummaries } from '../services/api';

interface SummaryCardsProps {
    handleAnalysisClick: (state: any) => void;
    selectedAnalysis: any;
    searchTerm: string;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ handleAnalysisClick, selectedAnalysis, searchTerm }) => {
    const [summaries, setSummaries] = useState<Summary[]>([]);
    const [currentPage, setCurrentPage] = useState(0); // Current page for pagination
    const [cardsPerPage, setCardsPerPage] = useState(4); // Number of cards per page
    const [cardClicked, setCardClicked] = useState(false); // Track if a card is clicked

    const filteredSummaries = summaries.filter((summary) => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return (
            summary.bed_number.toLowerCase().includes(lowerCaseSearchTerm) ||
            summary.plants.join(' ').toLowerCase().includes(lowerCaseSearchTerm) ||
            summary.collection_date.toLowerCase().includes(lowerCaseSearchTerm)
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

        // Adjust cards per page based on screen width for mobile friendliness
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setCardsPerPage(1); // Show 1 card per page on mobile screens
            } else if (window.innerWidth < 1024) {
                setCardsPerPage(2); // Show 2 cards per page on tablets
            } else {
                setCardsPerPage(4); // Default to 4 cards per page on desktop
            }
        };

        handleResize(); // Call on component mount
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize); // Cleanup listener on unmount
        };
    }, []);

    const totalPages = Math.ceil(filteredSummaries.length / cardsPerPage);

    const scrollLeft = () => {
        setCurrentPage((prevPage) => (prevPage > 0 ? prevPage - 1 : totalPages - 1));
    };

    const scrollRight = () => {
        setCurrentPage((prevPage) => (prevPage < totalPages - 1 ? prevPage + 1 : 0));
    };

    const handleDotClick = (pageIndex: number) => {
        setCurrentPage(pageIndex);
    };

    const handleCardClick = (summary: Summary) => {
        setCardClicked(true); // Set to true once a card is clicked
        handleAnalysisClick(summary);
    };

    const currentSummaries = filteredSummaries.reverse().slice(
        currentPage * cardsPerPage,
        (currentPage + 1) * cardsPerPage
    );

    return (
        <>
            <div className={`relative flex flex-col items-center justify-center w-full p-4 ${cardClicked ? 'h-auto' : 'h-full'}`}>
                {/* Arrow buttons */}
                <div className="flex items-center justify-between w-full">
                    {/* Left arrow */}
                    <button
                        onClick={scrollLeft}
                        className="bg-gray-200 hover:bg-gray-300 p-2 rounded-full z-10 text-black hidden sm:block" // Hide arrows on small screens
                    >
                        <FaChevronLeft size={24} />
                    </button>

                    {/* Cards container */}
                    <div className="flex gap-4 justify-center w-full">
                        {currentSummaries.map((summary) => (
                            <AnalysisCard
                                key={summary.video_id}
                                plantName={summary.plants.join(' ')}
                                bedNumber={summary.bed_number}
                                collectionDate={summary.collection_date}
                                onClick={() => handleCardClick(summary)}
                            />
                        ))}
                    </div>

                    {/* Right arrow */}
                    <button
                        onClick={scrollRight}
                        className="bg-gray-200 hover:bg-gray-300 p-2 rounded-full z-10 text-black hidden sm:block" // Hide arrows on small screens
                    >
                        <FaChevronRight size={24} />
                    </button>
                </div>

                {/* Dots for pagination */}
                <div className="flex justify-center mt-4">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <div
                            key={index}
                            onClick={() => handleDotClick(index)}
                            className={`cursor-pointer w-3 h-3 mx-1 rounded-full ${
                                index === currentPage ? 'bg-blue-500' : 'bg-gray-300'
                            }`}
                        />
                    ))}
                </div>
            </div>

            {/* Message when no analysis is selected */}
            {!selectedAnalysis && (
                <div className="flex justify-center items-center h-40 text-gray-500 text-xl">
                    Please select a bed to view analysis.
                </div>
            )}
        </>
    );
};

export default SummaryCards;
