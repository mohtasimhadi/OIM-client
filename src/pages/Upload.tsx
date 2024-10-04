import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import FontAwesome for icons
import UploadModal from '../components/UploadModal';

const UploadVideo: React.FC = () => {
  const [droppedFiles, setDroppedFiles] = useState<File[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Filter out only mp4 files
    const mp4Files = acceptedFiles.filter((file) => file.type === 'video/mp4');
    setDroppedFiles(mp4Files);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/mp4': ['.mp4'],
    },
  });

  const handleUpload = () => {
    if (droppedFiles.length === 0) {
      alert('Please add some videos to upload.');
      return;
    }
    setIsModalOpen(true);
  };

  const handleModalSubmit = (videoInfo: { file: File; bedNumber: string; gpsFile: File | null; collectionDate: string }[]) => {
    // Simulate upload process with the provided information
    videoInfo.forEach((info) => {
      console.log(`Uploading video: ${info.file.name}`);
      console.log(`Bed number: ${info.bedNumber}`);
      console.log(`Collection Date: ${info.collectionDate}`);
      if (info.gpsFile) {
        console.log(`GPS file: ${info.gpsFile.name}`);
      }
    });

    alert('Upload process completed. Check console for details.');
    setDroppedFiles([]);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      {/* Drag and Drop Area */}
      <div
        {...getRootProps()}
        className={`w-4/5 md:w-1/2 h-1/2 p-10 bg-white/10 border-4 border-dashed rounded-lg flex flex-col items-center justify-center transition-all ${
          isDragActive ? 'border-white-500 bg-white-50' : 'border-white-300'
        }`}
      >
        <input {...getInputProps()} />
        <i className="fas fa-upload text-4xl mb-4 text-white-500"></i>
        {isDragActive ? (
          <p className="text-center text-white-600 font-semibold">Drop the .mp4 files here...</p>
        ) : (
          <p className="text-center text-white-600 font-semibold">
            Drag and drop .mp4 files here, or click to select files
          </p>
        )}
      </div>

      {/* Display Dropped Files */}
      {droppedFiles.length > 0 && (
        <div className="mt-6 w-3/4 md:w-1/2">
          <h2 className="text-xl font-bold mb-2">Dropped Files:</h2>
          <ul className="list-disc list-inside bg-white/20 shadow p-4 rounded-lg">
            {droppedFiles.map((file, index) => (
              <li key={index} className="text-white-800">
                {file.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        className="mt-6 px-6 py-3 bg-white/20 text-white font-semibold rounded-lg shadow hover:bg-white-700 transition-all"
      >
        Upload Video
      </button>

      {/* Modal */}
      {isModalOpen && (
        <UploadModal
          files={droppedFiles}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleModalSubmit}
        />
      )}
    </div>
  );
};

export default UploadVideo;
