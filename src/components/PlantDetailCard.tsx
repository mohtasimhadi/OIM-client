import React from 'react';

interface PlantDetailCardProps {
  items: { label: string; value: string }[];
}

const PlantDetailCard: React.FC<PlantDetailCardProps> = ({ items }) => (
  <div className="rounded-lg shadow-lg p-6 flex items-center space-x-4 bg-white/10">
    <img src="https://via.placeholder.com/150" alt="Plant" className="w-1/3 rounded-md shadow-sm" />
    <div className="flex-1 space-y-2">
      {items.map((item, index) => (
        <div key={index} className="flex">
          <div className="bg-gray-600 text-white px-4 py-2 rounded-l-lg font-semibold w-1/2">
            {item.label}:
          </div>
          <div className="bg-gray-300 text-black px-4 py-2 rounded-r-lg w-1/2">
            {item.value}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default PlantDetailCard;