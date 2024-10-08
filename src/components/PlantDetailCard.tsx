import React from 'react';
import { PlantDetailCardProps } from '../types';
import { LiaDrawPolygonSolid } from "react-icons/lia";
import { IoShapesOutline } from "react-icons/io5";
import { TbOvalVertical } from "react-icons/tb";
import { GiPlainCircle } from "react-icons/gi";
import { MdOutlineMultilineChart } from "react-icons/md";


const CircularProgress: React.FC<{
  icon: React.ReactNode;
  value: number;
  label: string;
}> = ({ icon, value, label }) => (
  <div className="flex flex-col items-center space-y-2">
    <div className="relative w-16 h-16">
      <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
        {/* Background Circle */}
        <path
          className="text-gray-400"
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeDasharray="4, 2" // Dashed stroke
        />
        {/* Progress Circle */}
        <path
          className="text-white"
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeDasharray={`${value * 100}, 100`}
          strokeLinecap="round"
        />
      </svg>
      {/* Value inside the circle */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xm font-semibold text-white">
          {(value * 100).toFixed(1)}%
        </span>
      </div>
    </div>
    <div className="flex items-center text-xm text-white font-semibold">
      {icon} {label}
    </div>
  </div>
);

const PlantDetailCard: React.FC<PlantDetailCardProps> = ({
  track_id: id,
  image,
  circularity,
  eccentricity,
  area,
  perimeter,
  confidence,
  appearance,
  rating,
}) => (
  <div className="relative rounded-lg shadow-lg p-6 flex bg-white/10 hover:scale-105 hover:bg-white/15">
    {/* Plant ID Tag */}
    <div className="absolute top-0 right-0 bg-white text-black px-3 py-2 rounded-tr-lg rounded-bl-lg text-xl font-bold">
      Plant ID: {id}
    </div>

    {/* Left Column - Plant Image */}
    <div className="w-1/3 h-35">
      <img src={`http://172.19.214.198:8000/image/view/${image}`} alt="Plant" className="w-full aspect-square rounded-md shadow-sm" />
    </div>

    {/* Right Column - Details */}
    <div className="w-2/3 flex flex-col space-y-4 pl-6 items-center justify-center">
      {/* First Row - Circularity, Eccentricity, Confidence Threshold */}
      <div className="flex items-center justify-around space-x-4">
        <CircularProgress value={circularity} label="Circularity" icon={<GiPlainCircle className='mr-2'/>} />
        <CircularProgress value={eccentricity} label="Eccentricity" icon={<TbOvalVertical className='mr-2'/>} />
        <CircularProgress value={confidence} label="Confidence Threshold" icon={<MdOutlineMultilineChart className='mr-2'/>} />
      </div>

      {/* Second Row - Area and Perimeter */}
      {/* Area */}
      <div className="flex w-full">
        <div className="flex items-center bg-white/30 text-white px-4 py-2 rounded-l-lg font-semibold w-1/2">
          <IoShapesOutline className='mr-2' />
          Area:
        </div>
        <div className="bg-white/20 text-white px-4 py-2 rounded-r-lg w-1/2">
          {parseFloat(area.toFixed(2))} pixels^2
        </div>
      </div>

      {/* Perimeter */}
      <div className="flex w-full">
        <div className="flex items-center bg-white/30 text-white px-4 py-2 rounded-l-lg font-semibold w-1/2">
          <LiaDrawPolygonSolid className='mr-2' />
          Perimeter:
        </div>
        <div className="bg-white/20 text-white px-4 py-2 rounded-r-lg w-1/2">
          {parseFloat(perimeter.toFixed(2))} pixels
        </div>

      </div>
    </div>
  </div>
);

export default PlantDetailCard;
