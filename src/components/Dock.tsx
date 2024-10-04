import React from 'react';

interface BottomMenuProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  currentPage: string;
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
}

const Dock: React.FC<BottomMenuProps> = ({ darkMode, setDarkMode, currentPage, setCurrentPage }) => {
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-3/4 max-w-md flex justify-around items-center bg-white/20 text-white p-4 rounded-full shadow-lg backdrop-blur-lg">
      {/* Navigation Buttons */}
      <button
        className={`flex-1 text-center transition-colors ${
          currentPage === 'dashboard' ? (darkMode ? 'text-blue-400' : 'text-[#a3b18a]') : ''
        } font-bold`}
        onClick={() => setCurrentPage('dashboard')}
      >
        Dashboard
      </button>
      <button
        className={`flex-1 text-center transition-colors ${
          currentPage === 'map' ? (darkMode ? 'text-blue-400' : 'text-[#a3b18a]') : ''
        } font-bold`}
        onClick={() => setCurrentPage('map')}
      >
        Map
      </button>
      
      {/* Vertical Divider */}
      <div className="h-6 w-px bg-white mx-4"></div>
      
      {/* Custom Toggle Switch for Dark/Light Mode */}
      <div className="flex items-center space-x-2">
        <div
          onClick={() => setDarkMode(!darkMode)}
          className={`${
            darkMode ? 'bg-blue-600' : 'bg-[#a3b18a]'
          } relative inline-flex items-center h-6 rounded-full w-12 cursor-pointer transition-colors`}
        >
          <span
            className={`${
              darkMode ? 'translate-x-6' : 'translate-x-1'
            } inline-block w-5 h-5 transform bg-white rounded-full transition-transform`}
          />
        </div>
        <span className="text-xs">{darkMode ? 'Dark Mode' : 'Light Mode'}</span>
      </div>
    </div>
  );
};

export default Dock;
