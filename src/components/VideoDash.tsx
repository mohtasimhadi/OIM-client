import VideoCard from '../components/VideoCard';
import { FaPlay } from "react-icons/fa";
import { FaPause, FaStop } from 'react-icons/fa6';
import ReactPlayer from 'react-player';
import React, { useRef, useState } from 'react';

interface VideoDashProps {
    video: string;
    annotatedVideo: string;
}


const VideoDash: React.FC<VideoDashProps> = ({ video, annotatedVideo }) => {
    const playerRefOriginal = useRef<ReactPlayer | null>(null);
    const playerRefAnnotated = useRef<ReactPlayer | null>(null);
    const [playing, setPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    
    const togglePlayPause = () => {
        setPlaying(!playing); // Toggles between play and pause
      };
    
      const stopVideos = () => {
        setPlaying(false);
        if (playerRefOriginal.current && playerRefAnnotated.current) {
          playerRefOriginal.current.seekTo(0);
          playerRefAnnotated.current.seekTo(0);
          setProgress(0); // Reset progress
        }
      };
    
      const handleProgress = (state: any) => {
        setProgress(state.played); // Update progress bar
      };
    
      const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newProgress = parseFloat(e.target.value);
        setProgress(newProgress);
        if (playerRefOriginal.current && playerRefAnnotated.current) {
          playerRefOriginal.current.seekTo(newProgress); // Sync both videos
          playerRefAnnotated.current.seekTo(newProgress);
        }
      };

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <VideoCard
                    ref={playerRefOriginal}
                    key={`${video}`}
                    title="Original Video"
                    videoID={video}
                    playing={playing}
                    onProgress={handleProgress}
                />
                <VideoCard
                    ref={playerRefAnnotated}
                    key={`${annotatedVideo}`}
                    title="Annotated Video"
                    videoID={annotatedVideo}
                    playing={playing}
                    onProgress={handleProgress}
                />
            </div>
            <div className="flex w-full items-center justify-center space-x-4 my-2">
                <div className="flex items-center justify-center space-x-4 my-2">
                    <button
                        onClick={togglePlayPause}
                        className={`px-4 py-2 rounded-full bg-white/15 text-white`}>
                        {playing ? <FaPause /> : <FaPlay />}
                    </button>
                    <button onClick={stopVideos} className="px-4 py-2 rounded-full bg-white/15 text-white"><FaStop /></button>
                </div>

                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={progress}
                    onChange={handleSeek}
                    className="w-full h-2 bg-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
        </>
    )
}

export default VideoDash