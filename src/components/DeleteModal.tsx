import React from 'react';

interface LoadingModalProps {
  show: boolean;
}

const DeleteModal: React.FC<LoadingModalProps> = ({ show }) => {
  if (!show) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
        <p className="mt-4 text-xl font-medium text-black">Deleting analysis...</p>
      </div>
    </div>
  );
};

export default DeleteModal;