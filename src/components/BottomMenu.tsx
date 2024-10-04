import React from 'react';

interface BottomMenuProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const BottomMenu: React.FC<BottomMenuProps> = ({ darkMode, setDarkMode }) => {
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-3/4 max-w-md flex justify-around items-center bg-gray-800/90 text-white p-4 rounded-full shadow-lg backdrop-blur-lg">
      <button className="flex-1 text-center">Dashboard</button>
      <button className="flex-1 text-center">Map</button>
      {/* Custom Toggle Switch for Dark/Light Mode */}
      <div className="flex items-center space-x-2">
        <div
          onClick={() => setDarkMode(!darkMode)}
          className={`${
            darkMode ? 'bg-blue-600' : 'bg-gray-300'
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

export default BottomMenu;
