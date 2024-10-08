import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import '@fortawesome/fontawesome-free/css/all.min.css';
import UploadModal from '../components/UploadModal';
import { uploadVideos } from '../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UploadVideo: React.FC = () => {
  const [droppedFiles, setDroppedFiles] = useState<File[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
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
      toast.warn('Please add some videos to upload.');
      return;
    }
    setIsModalOpen(true);
  };

  const handleModalSubmit = async (videoInfo: { file: File; bedNumber: string; gpsFile: File | null; collectionDate: string }[]) => {
    try {
      setIsUploading(true);
      const result = await uploadVideos(videoInfo);
      toast.success('Upload process completed!', result);
      setDroppedFiles([]);
    } catch (error) {
      toast.error('An error occurred during the upload. Please check the console for more details.');
    } finally {
      setIsModalOpen(false);
      setIsUploading(false);
    }
  };

  if (isUploading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black/50">
        <div className="flex flex-col items-center">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32 mb-4"></div>
          <p className="text-white text-lg font-semibold">Uploading files, please stay on this page and wait...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      <ToastContainer />
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

// Custom loader styles
const loaderStyles = `
  .loader {
    border-color: #3498db transparent transparent transparent;
    animation: spinner 1.2s linear infinite;
  }
  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

// Add the loader styles to the document head
const styleElement = document.createElement('style');
styleElement.textContent = loaderStyles;
document.head.appendChild(styleElement);

export default UploadVideo;
