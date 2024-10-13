import React from 'react';
import { TotalOverViewProps } from '../types';
import { PiPottedPlantBold as Plant } from 'react-icons/pi';
import { LiaDrawPolygonSolid as Perimeter } from 'react-icons/lia';
import { IoShapesOutline as Area } from 'react-icons/io5';
import { MdOutlineDateRange as Date } from 'react-icons/md';
import { TbOvalVertical as Eccentricity } from "react-icons/tb";
import { GiPlainCircle as Circularity } from "react-icons/gi";

const TotalOverviewCard: React.FC<TotalOverViewProps> = ({ title, value, color1, color2, color3 }) => {
    return (
        <div 
            className='w-full p-4 rounded-lg hover:scale-105'
            style={{ background: `linear-gradient(to right, ${color1}, ${color2}, ${color2}, ${color3})` }}
        >
            {title === 'Total Plants' && <Plant size={48}/>}
            {title === 'Average Area' && <Area size={48}/>}
            {title === 'Average Perimeter' && <Perimeter size={48}/>}
            {title === 'Collection Date' && <Date size={48}/>}
            {title === 'Average Circularity' && <Circularity size={48}/>}
            {title === 'Average Eccentricity' && <Eccentricity size={48}/>}
            <p className='font-semibold text-2xl'>{value}</p>
            <p>{title}</p>
        </div>
    );
};

export default TotalOverviewCard;