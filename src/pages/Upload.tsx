import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import FontAwesome for icons

const UploadVideo: React.FC = () => {
  const [droppedFiles, setDroppedFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Filter out only mp4 files
    const mp4Files = acceptedFiles.filter(file => file.type === 'video/mp4');
    setDroppedFiles(mp4Files);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/mp4': ['.mp4']
    }
  });

  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      {/* Logo Section - Using FontAwesome Video Icon */}
      <div className="mb-4">
        <i className="fas fa-video fa-5x text-white-600"></i>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold mb-10">Upload Video</h1>

      {/* Drag and Drop Area */}
      <div
        {...getRootProps()}
        className={`w-4/5 md:w-1/2 h-1/2 p-10 border-4 border-dashed rounded-lg flex flex-col items-center justify-center transition-all ${
          isDragActive ? 'border-white-500 bg-white-50' : 'border-white-300'
        }`}
      >
        <input {...getInputProps()} />
        <i className="fas fa-upload text-4xl mb-4 text-white-500"></i>
        {isDragActive ? (
          <p className="text-center text-white-600 font-semibold">Drop the .mp4 files here...</p>
        ) : (
          <p className="text-center text-white-600 font-semibold">Drag and drop .mp4 files here, or click to select files</p>
        )}
      </div>

      {/* Display Dropped Files */}
      {droppedFiles.length > 0 && (
        <div className="mt-6 w-3/4 md:w-1/2">
          <h2 className="text-xl font-bold mb-2">Dropped Files:</h2>
          <ul className="list-disc list-inside bg-white shadow p-4 rounded-lg">
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
        onClick={() => alert('Upload feature will be implemented here')}
        className="mt-6 px-6 py-3 bg-white-600 text-white font-semibold rounded-lg shadow hover:bg-white-700 transition-all"
      >
        Upload Video
      </button>
    </div>
  );
};

export default UploadVideo;
