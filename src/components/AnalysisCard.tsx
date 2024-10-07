import React from 'react';

interface AnalysisCardProps {
  videoId: string;
  bedNumber: string;
  collectionDate: string;
}

const AnalysisCard: React.FC<AnalysisCardProps> = ({ videoId, bedNumber, collectionDate }) => {
  const handleCardClick = () => {
    // Handle the action when clicking the card
    // This could be a redirection to a detailed analysis page, a modal, etc.
    console.log('Clicked analysis card for:', videoId);
    // Example: Redirect to another page
    // window.location.href = `/analysis/${videoId}`;
  };

  return (
    <div
      onClick={handleCardClick}
      className="p-4 bg-white/20 rounded-lg shadow-md cursor-pointer transition-transform transform hover:scale-105 hover:bg-white/30"
    >
      <h3 className="text-lg font-semibold mb-2">Bed: {bedNumber}</h3>
      <p className="mb-1">Collection Date: {collectionDate}</p>
      <p className="text-sm text-gray-400">Video ID: {videoId}</p>
    </div>
  );
};

export default AnalysisCard;
