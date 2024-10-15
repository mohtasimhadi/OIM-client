import { FaCarBattery } from "react-icons/fa";
import { HiOutlineStatusOnline } from "react-icons/hi";
import { SlSpeedometer } from "react-icons/sl";
import { MdMyLocation } from "react-icons/md";
import { CiTempHigh } from "react-icons/ci";
import MotorCard from "../components/RoverDashboard/MotorCard";
import CameraCard from "../components/RoverDashboard/CameraCard";


const RoverDashboard = () => {

  return (
    <div className='p-4 pt-0 min-h-full'>
      <div className="container mx-auto space-y-6">

        <div className="rounded-lg shadow-md p-6 bg-white/10 relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* Big Dash Card */}
            <div className="col-span-1 space-y-4">
              <div className="w-full p-4 rounded-lg hover:scale-105 bg-gradient-to-r from-lime-700 from-10% via-lime-600 via-30% to-lime-500 to-90%">
                <MdMyLocation size={48} />
                <p className='font-semibold text-2xl'>516.231351 N, 12.21351 W</p>
                <p>Current Location</p>
              </div>
            </div>

            {/* Small Dash Cards - 4 */}
            <div className="col-span-2 space-y-4 flex flex-col items-center justify-around">
              <div className='grid grid-cols-2 md:grid-cols-4 gap-4 w-full'>

                <div className='w-full p-4 rounded-lg hover:scale-105 bg-gradient-to-r from-teal-700 from-10% via-teal-600 via-30% to-teal-500 to-90%'>
                  <HiOutlineStatusOnline size={48} />
                  <p className='font-semibold text-2xl'>IDLE</p>
                  <p>Status</p>
                </div>
                <div className='w-full p-4 rounded-lg hover:scale-105 bg-gradient-to-r from-cyan-700 from-10% via-cyan-600 via-30% to-cyan-500 to-90%'>
                  <FaCarBattery size={48} />
                  <p className='font-semibold text-2xl'>93%</p>
                  <p>Battery</p>
                </div>
                <div className='w-full p-4 rounded-lg hover:scale-105 bg-gradient-to-r from-sky-700 from-10% via-sky-600 via-30% to-sky-500 to-90%'>
                  <SlSpeedometer size={48} />
                  <p className='font-semibold text-2xl'>0.00 ft/min</p>
                  <p>Speed</p>
                </div>
                <div className='w-full p-4 rounded-lg hover:scale-105 bg-gradient-to-r from-rose-700 from-10% via-rose-600 via-30% to-rose-500 to-90%'>
                  <CiTempHigh size={48} />
                  <p className='font-semibold text-2xl'>84F</p>
                  <p>Temperature  </p>
                </div>

              </div>
            </div>


          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {/* Motor Status */}
            <div className="col-span-1 space-y-4 flex flex-col items-center justify-around w-full">
              <div className="grid grid-cols-2 gap-4 w-full">
                <MotorCard motor="A" volt={43} rpm={0} temp={84} amp={0} />
                <MotorCard motor="B" volt={43} rpm={0} temp={84} amp={0} />
                <MotorCard motor="C" volt={43} rpm={0} temp={84} amp={0} />
                <MotorCard motor="D" volt={43} rpm={0} temp={84} amp={0} />
              </div>
            </div>

            {/* Camera Status */}
            <div className="col-span-2 space-y-4 flex flex-col items-center justify-around">
              <div className="grid grid-cols-1 gap-4 w-full">
                <CameraCard/>
              </div>
            </div>
          </div>

        </div>



      </div>
    </div>
  );
};

export default RoverDashboard;


