import React, { useState } from 'react';

interface UserMenuProps {
  darkMode: boolean;
}

const UserMenu: React.FC<UserMenuProps> = ({ darkMode }) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`p-4 rounded-full transition ${darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-700 text-white hover:bg-gray-700'}`}
      >
        <i className="fas fa-user fa-lg"></i>
      </button>
      {open && (
        <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border`}>
          <ul className="py-2">
            <li className={`px-4 py-2 cursor-pointer transition ${darkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-100 text-black'}`}>Profile</li>
            <li className={`px-4 py-2 cursor-pointer transition ${darkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-100 text-black'}`}>Logout</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
