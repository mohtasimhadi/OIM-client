import React from 'react';
import { PiPottedPlantBold } from "react-icons/pi";
import { MdOutlineDateRange } from "react-icons/md";
import { IoCloudDownloadOutline } from "react-icons/io5";

interface TotalOverViewXLProps {
    bed_number: string | null;
    plants: string;
    collection_date: string | null;
    total_plants: number | null;
}

const TotalOverviewCardXL: React.FC<TotalOverViewXLProps> = ({ bed_number, plants, collection_date, total_plants }) => {
    return (
        <div className='w-full flex bg-gradient-to-r from-white-15 via-white-15 to-black-10 rounded-lg hover:scale-105'>
            <div>
                <div className="flex items-center pt-4 pl-4 w-full font-semibold text-3xl">
                    {bed_number} | {plants}
                </div>
                <div className='flex'>
                    <div className='p-4 flex items-center justify-center'>
                        <div className='mr-2' ><MdOutlineDateRange size={32} /></div>
                        <div>
                            <p className='font-semibold text-xl'>{collection_date}</p>
                            <p>Collection Date</p>
                        </div>
                    </div>
                    <div className='p-4 flex items-center justify-center'>
                        <div className='mr-2' ><PiPottedPlantBold size={32} /></div>
                        <div>
                            <p className='font-semibold text-xl'>{total_plants}</p>
                            <p>Total Plants</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex items-center justify-center ml-4'>
                <button className='flex items-center justify-center space-x-2 hover:bg-white/15 rounded-lg p-4'>
                    <IoCloudDownloadOutline size={48} />
                </button>
            </div>
        </div>
    );
};

export default TotalOverviewCardXL;