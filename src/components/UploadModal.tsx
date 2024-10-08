import React, { useState, useEffect } from 'react';
import { VideoInfo, UploadModalProps } from '../types';

const UploadModal: React.FC<UploadModalProps> = ({ files, onClose, onSubmit }) => {
  const [videoInfoList, setVideoInfoList] = useState<VideoInfo[]>([]);

  useEffect(() => {
    // Initialize video info state for each uploaded file
    const initialVideoInfo = files.map((file) => ({
      file,
      bedNumber: '',
      gpsFile: null,
      collectionDate: new Date().toISOString().split('T')[0], // Set default date to today
    }));
    setVideoInfoList(initialVideoInfo);
  }, [files]);

  const handleBedNumberChange = (index: number, value: string) => {
    const updatedInfo = [...videoInfoList];
    updatedInfo[index].bedNumber = value;
    setVideoInfoList(updatedInfo);
  };

  const handleDateChange = (index: number, value: string) => {
    const updatedInfo = [...videoInfoList];
    updatedInfo[index].collectionDate = value;
    setVideoInfoList(updatedInfo);
  };

  const handleGpsFileChange = (index: number, file: File | null) => {
    const updatedInfo = [...videoInfoList];
    updatedInfo[index].gpsFile = file;
    setVideoInfoList(updatedInfo);
  };

  const handleSubmit = () => {
    if (videoInfoList.some((info) => !info.bedNumber)) {
      alert('Please enter a bed number for all videos.');
      return;
    }
    onSubmit(videoInfoList);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-black/65 rounded-lg p-8 w-3/4 max-h-[80%] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Upload Information</h2>
        <p className="mb-4">Provide additional information for the uploaded videos:</p>

        {videoInfoList.map((info, index) => (
          <div key={index} className="mb-6 border-b border-gray-600 pb-4">
            <h3 className="text-xl font-semibold mb-2">Video: {info.file.name}</h3>

            {/* Bed Number Input */}
            <div className="mb-4">
              <label className="block font-semibold mb-1">Bed Number:</label>
              <input
                type="text"
                value={info.bedNumber}
                onChange={(e) => handleBedNumberChange(index, e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-black"
                placeholder="Enter bed number"
              />
            </div>

            {/* Collection Date Input */}
            <div className="mb-4">
              <label className="block font-semibold mb-1">Collection Date:</label>
              <input
                type="date"
                value={info.collectionDate}
                onChange={(e) => handleDateChange(index, e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-black"
              />
            </div>

            {/* GPS File Upload Button */}
            <div className="mb-4">
              <label className="block font-semibold mb-1">GPS File (optional):</label>
              <input
                type="file"
                accept=".txt,.csv"
                onChange={(e) => handleGpsFileChange(index, e.target.files ? e.target.files[0] : null)}
                className="w-full p-2 border border-gray-300 rounded bg-black/20 text-white"
              />
              {info.gpsFile && (
                <p className="mt-2 text-white">{info.gpsFile.name}</p>
              )}
            </div>
          </div>
        ))}

        <div className="flex justify-end space-x-4 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
