import React from 'react';
import { AnalysisCardProps } from '../types';


const AnalysisCard: React.FC<AnalysisCardProps> = ({ videoId, bedNumber, collectionDate, onClick }) => {

  return (
    <div
      onClick={onClick}
      className="p-4 bg-white/20 rounded-lg shadow-md cursor-pointer transition-transform transform hover:scale-105 hover:bg-white/30"
    >
      <h3 className="text-lg font-semibold mb-2">Bed: {bedNumber}</h3>
      <p className="mb-1">Collection Date: {collectionDate}</p>
    </div>
  );
};

export default AnalysisCard;
