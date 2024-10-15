import React from 'react';
import { AnalysisCardProps } from '../types';
import { MdDateRange } from "react-icons/md";
import { SiNamecheap } from "react-icons/si";
import { PiPottedPlantBold } from "react-icons/pi";

const AnalysisCard: React.FC<AnalysisCardProps> = ({ plantName, bedNumber, collectionDate, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="min-w-1/2 h-[auto] p-4 bg-gradient-to-r from-black/50 via-black/35 to-black/20 rounded-lg shadow-md cursor-pointer transition-transform transform hover:scale-105 hover:bg-black/30"
      style={{ minWidth: '300px' }}
    >
      <h3 className="text-lg font-semibold mb-2 flex items-center"><SiNamecheap className='mr-2'/> {bedNumber}</h3>
      <h3 className="flex items-center text-lg font-semibold mb-2 bg-white text-gray-700 top-0 right-0 absolute p-1"> <PiPottedPlantBold className='mr-2'/> {plantName}</h3>
      <p className="mb-1 flex items-center">
        <MdDateRange className="mr-2" /> {collectionDate}
      </p>

    </div>
  );
};

export default AnalysisCard;
