import React, { useState } from 'react';
import BottomMenu from './components/BottomMenu';
import UserMenu from './components/UserMenu';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  return (
    <div className={`w-screen h-screen overflow-hidden ${darkMode ? "bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white" : "bg-gradient-to-br from-[#99e2b4] via-[#88d4ab] to-[#036666] text-black"}`}>
      <div className="relative h-full w-full p-4">
        <div className="absolute top-0 right-0 m-4">
          <UserMenu darkMode={darkMode} />
        </div>
        <div className="h-full w-full overflow-y-auto">
          <Dashboard darkMode={darkMode} />
        </div>
        <BottomMenu darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>
    </div>
  );
};

export default App;
