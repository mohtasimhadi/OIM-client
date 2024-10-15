import React, { useState, useEffect } from 'react';
import { PlantDetailCardProps } from '../types';
import { LiaDrawPolygonSolid } from "react-icons/lia";
import { IoShapesOutline } from "react-icons/io5";
import { TbOvalVertical } from "react-icons/tb";
import { GiPlainCircle } from "react-icons/gi";
import { MdOutlineMultilineChart } from "react-icons/md";
import { fetchImage } from '../services/api';

const CircularProgress: React.FC<{
  icon: React.ReactNode;
  value: number;
  label: string;
}> = ({ icon, value, label }) => (
  <div className="flex flex-col items-center space-y-2">
    <div className="relative w-16 h-16 md:w-20 md:h-20">
      <svg className="w-16 h-16 md:w-20 md:h-20 transform -rotate-90" viewBox="0 0 36 36">
        {/* Background Circle */}
        <path
          className="text-gray-300"
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeDasharray="4, 2"
        />
        {/* Progress Circle */}
        <path
          className="text-green-500"
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
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-semibold text-white">
          {(value * 100).toFixed(1)}%
        </span>
      </div>
    </div>
    <div className="flex items-center text-sm text-white font-medium">
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
  class_name,
}) => {
  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    const loadImage = async () => {
      try {
        const url = await fetchImage(image);
        setImageUrl(url);
      } catch (error) {
        console.error('Error loading image:', error);
      }
    };
    loadImage();
  }, [image]);

  return (
    <div className="relative rounded-xl shadow-xl p-4 md:p-6 bg-white/10 hover:scale-105 hover:bg-white/20 transition-transform duration-300 ease-in-out">
      {/* Plant ID Tag */}
      <div className="absolute top-0 right-0 bg-white text-black px-2 py-1 rounded-tr-lg rounded-bl-lg text-base md:text-lg font-bold shadow">
        {class_name} #{id}
      </div>

      {/* Content */}
      <div className="flex flex-col md:flex-row">
        {/* Left Column - Plant Image */}
        <div className="w-full aspect-square md:w-1/3 mb-4 md:mb-0 bg-white/10">
        <img src={imageUrl} alt="Plant" className="w-full h-full rounded-md shadow-lg" />

        </div>

        {/* Right Column - Details */}
        <div className="w-full md:w-2/3 pl-0 md:pl-6 flex flex-col justify-center space-y-4">
          {/* Circular Progress for Circularity, Eccentricity, Confidence */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <CircularProgress value={circularity} label="Circularity" icon={<GiPlainCircle />} />
            <CircularProgress value={eccentricity} label="Eccentricity" icon={<TbOvalVertical />} />
            <CircularProgress value={confidence} label="Confidence" icon={<MdOutlineMultilineChart />} />
          </div>

          {/* Area and Perimeter */}
          <div className="flex flex-col space-y-2">
            {/* Area */}
            <div className="flex bg-white/20 text-white rounded-md items-center shadow-md">
              <div className='flex bg-white/30 w-1/2 h-full px-4 py-2 items-center rounded-l-md'>
                <IoShapesOutline className="mr-2" />
                <span className="font-semibold">Area:</span>
              </div>
              <div className='pl-2'>
                {parseFloat(area.toFixed(2))} pixels²
              </div>
            </div>

            {/* Perimeter */}
            <div className="flex bg-white/20 text-white rounded-md items-center shadow-md">
              <div className='flex bg-white/30 w-1/2 h-full px-4 py-2 items-center rounded-l-md'>
                <LiaDrawPolygonSolid className="mr-2" />
                <span className="font-semibold">Perimeter:</span>
              </div>
              <div className='pl-2'>
                {parseFloat(perimeter.toFixed(2))} pixels
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantDetailCard;
