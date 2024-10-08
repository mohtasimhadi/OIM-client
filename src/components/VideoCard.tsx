import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player'; // Import ReactPlayer
import { MdVideoLibrary } from "react-icons/md";
import { fetchVideo } from '../services/api'; // Import the API function to fetch the video
import { VideoCardProps } from '../types';

const VideoCard: React.FC<VideoCardProps> = ({ title, videoID: videoSrc }) => {
  const [fetchedVideoSrc, setFetchedVideoSrc] = useState<string | null>(null);

  useEffect(() => {
    const loadVideo = async () => {
      try {
        const url = await fetchVideo(videoSrc);
        setFetchedVideoSrc(url);
      } catch (error) {
        console.error('Error loading video:', error);
      }
    };

    loadVideo();
  }, [videoSrc]);

  return (
    <div>
      {fetchedVideoSrc ? (
        <ReactPlayer 
          url={fetchedVideoSrc} 
          className="w-full rounded-md border-2 border-gray-200"
          controls 
          width="100%" 
          height="auto"
        />
      ) : (
        // Placeholder div to maintain the same size as the video player
        <div className="w-full aspect-[3/1.7] rounded-md border-2 border-gray-200 flex justify-center items-center">
          <p>Loading video...</p>
        </div>
      )}
      <p className="flex items-center mb-2 text-center font-semibold"> 
        <MdVideoLibrary className="mr-2" /> {title}
      </p>
    </div>
  );
};

export default VideoCard;
