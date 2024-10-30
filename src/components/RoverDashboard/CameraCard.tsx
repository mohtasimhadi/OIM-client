import { useState } from 'react';
import { RxReset } from "react-icons/rx";

const CameraCard = () => {
    const [cameraType, setCameraType] = useState('');
    const [subCameraType, setSubCameraType] = useState('');
    const [isLive, setIsLive] = useState(false);

    // Handle starting/stopping the live feed
    const handleLiveFeed = () => {
        setIsLive(!isLive);
    };

    return (
        <div className="w-full items-center justify-center aspect-video bg-white/20 rounded-lg mx-auto transition-all duration-300">
            {/* Title */}
            <div className="w-full flex justify-between items-center text-3xl font-bold text-white p-4">
                {/* Camera Control Center text*/}
                <p>Camera Control Center</p>
                {/* Reset Button*/}
                <div>
                    <button
                        className="p-4 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors duration-200 shadow-lg"
                        onClick={() => {
                            setCameraType('');
                            setSubCameraType('');
                            setIsLive(false);
                        }}
                    >
                        <RxReset size={18} />
                    </button>
                </div>
            </div>
            <div className='w-full flex items-center justify-center'>
                <div className="w-4/5 aspect-video flex flex-col space-y-6 items-center justify-center">
                    {/* Camera Selection */}
                    {!cameraType && (
                        <div className="text-center text-white">
                            <h2 className="text-xl font-semibold mb-4">Select Camera Type</h2>
                            <div className="flex space-x-4">
                                <button
                                    className="p-4 bg-black/20 text-white rounded-lg hover:bg-black/40 hover:text-white transition-colors duration-200 shadow-lg"
                                    onClick={() => setCameraType('OAK-D Pro')}
                                >
                                    OAK-D Pro Camera 1
                                </button>
                                <button
                                    className="p-4 bg-black/20 text-white rounded-lg hover:bg-black/40 hover:text-white transition-colors duration-200 shadow-lg"
                                    onClick={() => setCameraType('OAK-D Pro')}
                                >
                                    OAK-D Pro Camera 2
                                </button>
                                <button
                                    className="p-4 bg-black/20 text-white rounded-lg hover:bg-black/40 hover:text-white transition-colors duration-200 shadow-lg"
                                    onClick={() => setCameraType('Zed')}
                                >
                                    Zed Camera
                                </button>
                            </div>
                        </div>

                    )}

                    {/* OAK-D Pro Sub-Camera Selection */}
                    {cameraType === 'OAK-D Pro' && !subCameraType && (
                        <div className="text-center text-white">
                            <h2 className="text-xl font-semibold mb-4">Select OAK-D Pro Sub-Camera Type</h2>
                            <div className="flex space-x-4">
                                <button
                                    className="p-4 bg-black/20 text-white rounded-lg hover:bg-black/40 hover:text-white transition-colors duration-200 shadow-lg"
                                    onClick={() => setSubCameraType('RGB')}
                                >
                                    RGB Camera
                                </button>
                                <button
                                    className="p-4 bg-black/20 text-white rounded-lg hover:bg-black/40 hover:text-white transition-colors duration-200 shadow-lg"
                                    onClick={() => setSubCameraType('Depth')}
                                >
                                    Depth Camera
                                </button>
                                <button
                                    className="p-4 bg-black/20 text-white rounded-lg hover:bg-black/40 hover:text-white transition-colors duration-200 shadow-lg"
                                    onClick={() => setSubCameraType('Stereo Left')}
                                >
                                    Stereo Left Camera
                                </button>
                                <button
                                    className="p-4 bg-black/20 text-white rounded-lg hover:bg-black/40 hover:text-white transition-colors duration-200 shadow-lg"
                                    onClick={() => setSubCameraType('Stereo Right')}
                                >
                                    Stereo Right Camera
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Zed Camera Sub-Camera Selection */}
                    {cameraType === 'Zed' && !subCameraType && (
                        <div className="text-center text-white">
                            <h2 className="text-xl font-semibold mb-4">Select Zed Camera Type</h2>
                            <div className="flex space-x-4">
                                <button
                                    className="p-4 bg-black/20 text-white rounded-lg hover:bg-black/40 hover:text-white transition-colors duration-200 shadow-lg"
                                    onClick={() => setSubCameraType('Left')}
                                >
                                    Left Camera
                                </button>
                                <button
                                    className="p-4 bg-black/20 text-white rounded-lg hover:bg-black/40 hover:text-white transition-colors duration-200 shadow-lg"
                                    onClick={() => setSubCameraType('Right')}
                                >
                                    Right Camera
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Live Feed Display */}
                    {subCameraType && (
                        <div className="text-center text-white w-full aspect-video">
                            <h2 className="text-xl font-semibold mb-4">{cameraType} - {subCameraType} Feed</h2>
                            <div className="w-4/5 aspect-video w-full bg-black/40 rounded-lg mb-4 flex items-center justify-center shadow-lg flex-col">
                                {isLive ? (
                                    <p className="text-white">Live {subCameraType} Camera Feed</p>
                                ) : (
                                    <p className="text-white">Camera feed is stopped</p>
                                )}
                                <button
                                    className={`p-4 w-full ${isLive ? 'bg-red-500' : 'bg-green-500'} hover:${isLive ? 'bg-red-600' : 'bg-green-600'} text-white rounded-lg transition-colors duration-200 shadow-lg`}
                                    onClick={handleLiveFeed}
                                >
                                    {isLive ? 'Stop Live Feed' : 'Start Live Feed'}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CameraCard;
