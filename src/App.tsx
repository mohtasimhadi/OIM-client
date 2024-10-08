import React, { useState } from "react";
import Dock from './components/Dock';
import Dashboard from './pages/Dashboard';
import Map from './pages/Map';
import Upload from './pages/Upload';
import RoverDash from "./pages/RoverDash";

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<string>('dashboard');
  const [searchTerm, setSearchTerm] = useState<string>(''); // Add searchTerm state

  return (
    <div className={`w-screen h-screen overflow-hidden ${darkMode ? "bg-gradient-to-br from-[#00253e] via-[#00253e] to-black text-white" : "bg-gradient-to-br from-[#415d43] via-[#415d43] to-[#111d13] text-white"}`}>
      {/* Dock at the top */}
      <div className="relative w-full p-4">
        <Dock
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          searchTerm={searchTerm}  // Pass searchTerm to Dock
          setSearchTerm={setSearchTerm} // Pass setSearchTerm to Dock
        />
      </div>

      <div className="h-full w-full overflow-y-auto pt-24">
        {currentPage === 'dashboard' && <Dashboard searchTerm={searchTerm} />} {/* Pass searchTerm to Dashboard */}
        {currentPage === 'map' && <Map />}
        {currentPage === 'upload' && <Upload />}
        {currentPage === 'rover' && <RoverDash />}
      </div>
    </div>
  );
};

export default App;