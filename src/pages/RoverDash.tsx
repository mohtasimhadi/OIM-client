import React from 'react';

const PolygonDiv = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div
        className="w-[300px] h-[300px] bg-blue-500"
        style={{
          clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
        }}
      ></div>
    </div>
  );
};

export default PolygonDiv;
