import React from 'react';

interface VideoCardProps {
  title: string;
  videoSrc: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ title, videoSrc }) => (
  <div>
    <p className="mb-2 text-center font-semibold">{title}</p>
    <video className="w-full aspect-[3/1.7] rounded-md border-2 border-gray-200" controls>
      <source src={videoSrc} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
);

export default VideoCard;