import React, { useState, useRef } from 'react';

const PolygonDiv = () => {
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const contentRef = useRef<HTMLDivElement>(null);

  // Handle zooming with scroll
  const handleScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();

    // Get bounding box of the container
    const container = contentRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();

    // Calculate mouse position relative to the container
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Calculate new zoom factor
    const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
    const newZoom = Math.min(10, Math.max(1, zoom * zoomFactor));

    // Adjust transform origin to the cursor position
    const originX = (mouseX / rect.width) * 100;
    const originY = (mouseY / rect.height) * 100;

    container.style.transformOrigin = `${originX}% ${originY}%`;
    setZoom(newZoom);
  };

  // Handle drag start
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setPosition({ x: e.clientX, y: e.clientY });
  };

  // Handle drag end
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle dragging
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const deltaX = e.clientX - position.x;
    const deltaY = e.clientY - position.y;

    setTranslate((prevTranslate) => ({
      x: prevTranslate.x + deltaX,
      y: prevTranslate.y + deltaY,
    }));

    setPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      className="relative w-full h-1/2 overflow-hidden border-2 bg-black p-4"
      onWheel={handleScroll}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      style={{
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
    >
      <div
        ref={contentRef}
        className="absolute"
        style={{
          transform: `translate(${translate.x}px, ${translate.y}px) scale(${zoom})`,
          transformOrigin: 'center',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '10px',
        }}
      >
        {[...Array(20)].map((_, index) => (
          <div
            key={index}
            className="w-[300px] h-[300px] bg-blue-500"
            style={{
              clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default PolygonDiv;
