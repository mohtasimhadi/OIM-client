import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import UserMenu from './UserMenu';

interface DockProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  currentPage: string;
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
}

const Dock: React.FC<DockProps> = ({ darkMode, setDarkMode, currentPage, setCurrentPage }) => {
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <div
      className={`fixed top-8 left-1/2 transform -translate-x-1/2 w-full max-w-4xl flex items-center bg-opacity-70 bg-[#1a1a1a] text-white p-4 rounded-full shadow-lg backdrop-blur-lg transition-all duration-300 ease-in-out z-50`}
    >
      {isSearching ? (
        <div className="flex flex-1 items-center space-x-2 px-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-white/20 text-white px-4 py-2 rounded-lg outline-none"
            placeholder="Search..."
          />
          <button
            onClick={() => {
              setIsSearching(false);
              setSearchQuery("");
            }}
            className="text-white px-2"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      ) : (
        <>
          <button
            onClick={() => setIsSearching(true)}
            className="text-white px-2"
          >
            <i className="fas fa-search"></i>
          </button>

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
          <button
            className={`flex-1 text-center transition-colors ${
              currentPage === 'upload' ? (darkMode ? 'text-blue-400' : 'text-[#a3b18a]') : ''
            } font-bold`}
            onClick={() => setCurrentPage('upload')}
          >
            Upload
          </button>

          <div className="h-6 w-px bg-white mx-4"></div>

          <div className="flex items-center space-x-4">
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
            {/* User Menu */}
            <UserMenu darkMode={darkMode} />
          </div>
        </>
      )}
    </div>
  );
};

export default Dock;