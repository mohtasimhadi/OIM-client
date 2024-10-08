import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import UserMenu from "./UserMenu";
import { DockProps } from "../types";

const Dock: React.FC<DockProps> = ({
  darkMode,
  setDarkMode,
  currentPage,
  setCurrentPage,
  searchTerm, // Add searchTerm prop
  setSearchTerm, // Add setSearchTerm prop
}) => {
  return (
    <div
      className={`fixed top-8 left-1/2 transform -translate-x-1/2 w-full max-w-4xl flex items-center bg-opacity-70 bg-[#1a1a1a] text-white p-2 rounded-full shadow-lg backdrop-blur-lg transition-all duration-300 ease-in-out z-50`}
    >
      <div className="flex items-center w-1/3 relative pl-3">
        <input
          type="text"
          placeholder="Search bed or plant..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm
          className={`p-2 pl-10 rounded-full w-full bg-white/20 text-white placeholder-gray-400 outline-none transition-colors duration-200 ease-in-out`}
        />
        <i className="fas fa-search absolute left-6 text-gray-400"></i>
      </div>

      <div className="flex items-center justify-around w-2/3">
        <button
          className={`text-center flex items-center space-x-2 transition-colors ${
            currentPage === "dashboard"
              ? darkMode
                ? "text-blue-400"
                : "text-[#a3b18a]"
              : ""
          } font-bold`}
          onClick={() => setCurrentPage("dashboard")}
        >
          <i className="fas fa-tachometer-alt"></i>
          <span>Dashboard</span>
        </button>

        <button
          className={`text-center flex items-center space-x-2 transition-colors ${
            currentPage === "map"
              ? darkMode
                ? "text-blue-400"
                : "text-[#a3b18a]"
              : ""
          } font-bold`}
          onClick={() => setCurrentPage("map")}
        >
          <i className="fas fa-map-marker-alt"></i>
          <span>Map</span>
        </button>

        <button
          className={`text-center flex items-center space-x-2 transition-colors ${
            currentPage === "upload"
              ? darkMode
                ? "text-blue-400"
                : "text-[#a3b18a]"
              : ""
          } font-bold`}
          onClick={() => setCurrentPage("upload")}
        >
          <i className="fas fa-upload"></i>
          <span>Upload</span>
        </button>

        <div className="h-6 w-px bg-white mx-4"></div>

        <div className="flex items-center space-x-4">
          <div
            onClick={() => setDarkMode(!darkMode)}
            className={`${
              darkMode ? "bg-blue-600" : "bg-[#a3b18a]"
            } relative inline-flex items-center h-6 rounded-full w-12 cursor-pointer transition-colors`}
          >
            <span
              className={`${
                darkMode ? "translate-x-6" : "translate-x-1"
              } inline-block w-5 h-5 transform bg-white rounded-full transition-transform`}
            />
          </div>
          <span className="text-xs">
            {darkMode ? "Dark Mode" : "Light Mode"}
          </span>
          <UserMenu darkMode={darkMode} />
        </div>
      </div>
    </div>
  );
};

export default Dock;
