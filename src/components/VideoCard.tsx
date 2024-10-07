// components/VideoCard.tsx

import React, { useState, useEffect } from 'react';
import { fetchVideo } from '../services/api'; // Import the API function to fetch the video

interface VideoCardProps {
  title: string;
  videoID: string;
}

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
      <p className="mb-2 text-center font-semibold">{title}</p>
      {fetchedVideoSrc ? (
        <video className="w-full aspect-[3/1.7] rounded-md border-2 border-gray-200" controls>
          <source src={fetchedVideoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <p>Loading video...</p>
      )}
    </div>
  );
};

export default VideoCard;
