import React from 'react';
import ReactPlayer from 'react-player';
import { MdVideoLibrary } from 'react-icons/md';
import { fetchVideo } from '../services/api';

interface VideoCardProps {
  title: string;
  videoID: string;
  playing: boolean;
  onProgress: (state: any) => void;
}

const VideoCard = React.forwardRef<ReactPlayer, VideoCardProps>(
  ({ title, videoID: videoSrc, playing, onProgress }, ref) => {
    const [fetchedVideoSrc, setFetchedVideoSrc] = React.useState<string | null>(null);

    React.useEffect(() => {
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
            ref={ref}
            url={fetchedVideoSrc}
            className="w-full rounded-md border-2 border-gray-200"
            playing={playing}
            onProgress={onProgress}
            controls={false} // Control via parent component
            width="100%"
            height="auto"
          />
        ) : (
          <div className="w-full aspect-[3/1.7] rounded-md border-2 border-gray-200 flex justify-center items-center">
            <p>Loading video...</p>
          </div>
        )}
        <p className="flex items-center mb-2 text-center font-semibold">
          <MdVideoLibrary className="mr-2" /> {title}
        </p>
      </div>
    );
  }
);

export default VideoCard;
