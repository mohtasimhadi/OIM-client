import React, { useEffect, useRef } from 'react';
import MapView from '@arcgis/core/views/MapView';
import WebMap from '@arcgis/core/WebMap';

const ArcGISMap = () => {
  const mapDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const webMap = new WebMap({
      portalItem: {
        id: 'd7e999d5193942759db61dd40644a76a', // WebMap ID
      },
    });

    const view = new MapView({
      container: mapDiv.current as HTMLDivElement,
      map: webMap,
      rotation: 90, // Set the maximum zoom-out level (larger scale number)
    });

    return () => {
      if (view) {
        view.destroy(); // Clean up the MapView when the component is unmounted
      }
    };
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div ref={mapDiv} className="w-full h-[600px] m-4"></div>
    </div>
  );
};

export default ArcGISMap;
