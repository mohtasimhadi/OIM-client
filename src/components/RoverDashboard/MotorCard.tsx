import React from 'react';
import { CiTempHigh } from "react-icons/ci";
import { GiClockwiseRotation } from "react-icons/gi";
import { TbCircuitVoltmeter } from "react-icons/tb";
import { TbWavesElectricity } from "react-icons/tb";

interface MotorCardProps {
    motor: string | null;
    volt: number | null;
    rpm: number | null;
    temp: number | null;
    amp: number | null;
}

const MotorCard: React.FC<MotorCardProps> = ({ motor, volt, rpm, temp, amp }) => {
    return (
        <div className='w-full flex bg-black/20 rounded-lg hover:scale-105'>
            <div>
                <div className='grid grid-cols-2 gap-4'>
                    <div className='p-4 items-center'>
                        <p className='font-semibold text-2xl ml-2'>{volt}V</p>
                        <div className='flex items-center gap-2 pt-1'><TbCircuitVoltmeter size={24} />Voltage</div>
                    </div>
                    <div className='p-4 items-center'>
                        <p className='font-semibold text-2xl ml-2'>{rpm}RPM</p>
                        <div className='flex items-center gap-2 pt-1'><GiClockwiseRotation size={24} />Rotation</div>
                    </div>
                    <div className='p-4 items-center'>
                        <p className='font-semibold text-2xl ml-2'>{temp}F</p>
                        <div className='flex items-center gap-2 pt-1'><CiTempHigh size={24} />Temperature</div>
                    </div>
                    <div className='p-4 items-center'>
                        <p className='font-semibold text-2xl ml-2'>{amp}mA</p>
                        <div className='flex items-center gap-2 pt-1'><TbWavesElectricity size={24} />Current</div>
                    </div>
                </div>
                <div className="flex items-center p-4 w-full font-semibold text-3xl">
                    <p className=''>Motor {motor}</p>
                </div>
            </div>
        </div>
    );
};

export default MotorCard;