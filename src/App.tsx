import React, { useState } from 'react';
import Dock from './components/Dock';
import Dashboard from './pages/Dashboard';
import Map from './pages/Map';
import Upload from './pages/Upload';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<string>('dashboard');

  return (
    <div className={`w-screen h-screen overflow-hidden ${darkMode ? "bg-gradient-to-br from-[#00253e] via-[#00253e] to-black text-white" : "bg-gradient-to-br from-[#415d43] via-[#415d43] to-[#111d13] text-white"}`}>
      {/* Dock at the top */}
      <div className="relative w-full p-4">
        <Dock 
          darkMode={darkMode} 
          setDarkMode={setDarkMode} 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage} 
        />
      </div>

      <div className="h-full w-full overflow-y-auto pt-24">
        {currentPage === 'dashboard' && <Dashboard />}
        {currentPage === 'map' && <Map />}
        {currentPage === 'upload' && <Upload />}
      </div>
    </div>
  );
};

export default App;
