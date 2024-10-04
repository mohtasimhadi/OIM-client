import React, { useState } from 'react';
import BottomMenu from './components/BottomMenu';
import UserMenu from './components/UserMenu';
import Dashboard from './pages/Dashboard';
import Map from './pages/Map';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<string>('dashboard');

  return (
    <div className={`w-screen h-screen overflow-hidden ${darkMode ? "bg-gradient-to-br from-[#00253e] via-[#00253e] to-black text-white" : "bg-gradient-to-br from-[#415d43] via-[#415d43] to-[#111d13] text-white"}`}>
      <div className="relative h-full w-full p-4">
        <div className="absolute top-0 right-0 m-4">
          <UserMenu darkMode={darkMode} />
        </div>
        <div className="h-full w-full overflow-y-auto">
          {currentPage === 'dashboard' ? <Dashboard /> : <Map />}
        </div>
        <BottomMenu darkMode={darkMode} setDarkMode={setDarkMode} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>
    </div>
  );
};

export default App;
