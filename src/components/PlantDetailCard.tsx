import React from 'react';

interface PlantDetailCardProps {
  id: string;
  image: string;
  circularity: number;
  eccentricity: number;
  area: string;
  perimeter: string;
  confidenceThreshold: number;
  appearance: string;
  rating: string;
}

const CircularProgress: React.FC<{
  value: number;
  label: string;
}> = ({ value, label }) => (
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
    <div className="text-xm text-white font-semibold">{label}</div>
  </div>
);

const PlantDetailCard: React.FC<PlantDetailCardProps> = ({
  id,
  image,
  circularity,
  eccentricity,
  area,
  perimeter,
  confidenceThreshold,
  appearance,
  rating,
}) => (
  <div className="relative rounded-lg shadow-lg p-6 flex items-center space-x-4 bg-white/10">
    {/* Plant ID Tag */}
    <div className="absolute top-2 right-2 bg-blue-500 text-white px-3 py-1 rounded-md text-xs font-bold shadow-md">
      Plant ID: {id}
    </div>

    {/* Plant Image */}
    <img src={image} alt="Plant" className="w-1/3 h-full rounded-md shadow-sm" />

    {/* Plant Details */}
    <div className="flex-1 space-y-3">
      {/* Circularity, Eccentricity, and Confidence Threshold with Circular Progress Bars Side by Side */}
      <div className="flex items-center justify-around space-x-4">
        <CircularProgress value={circularity} label="Circularity" />
        <CircularProgress value={eccentricity} label="Eccentricity" />
        <CircularProgress value={confidenceThreshold} label="Confidence Threshold" />
      </div>

      {/* Area */}
      <div className="flex">
        <div className="bg-white/30 text-white px-4 py-2 rounded-l-lg font-semibold w-1/2">
          Area:
        </div>
        <div className="bg-white/20 text-white px-4 py-2 rounded-r-lg w-1/2">
          {area}
        </div>
      </div>

      {/* Perimeter */}
      <div className="flex">
        <div className="bg-white/30 text-white px-4 py-2 rounded-l-lg font-semibold w-1/2">
          Perimeter:
        </div>
        <div className="bg-white/20 text-white px-4 py-2 rounded-r-lg w-1/2">
          {perimeter}
        </div>
      </div>

      {/* Appearance */}
      <div className="flex">
        <div className="bg-white/30 text-white px-4 py-2 rounded-l-lg font-semibold w-1/2">
          Appearance:
        </div>
        <div className="bg-white/20 text-white px-4 py-2 rounded-r-lg w-1/2">
          {appearance}
        </div>
      </div>

      {/* Rating */}
      <div className="flex">
        <div className="bg-white/30 text-white px-4 py-2 rounded-l-lg font-semibold w-1/2">
          Rating:
        </div>
        <div className="bg-white/20 text-white px-4 py-2 rounded-r-lg w-1/2">
          {rating}
        </div>
      </div>
    </div>
  </div>
);

export default PlantDetailCard;
