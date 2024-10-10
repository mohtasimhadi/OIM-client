import React from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Label,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from 'recharts';
import { AreaPerimeterProps } from '../types';

type DataItem = {
    track_id: number;
    area: number;
    perimeter: number;
};

const AreaAndPerimeterLineGraph: React.FC<AreaPerimeterProps> = ({ data, graph }) => {

    function meanList(numbers: number[]): number {
        if (numbers.length === 0) return 0;
        const mean = numbers.reduce((acc, num) => acc + num, 0) / numbers.length;
        return mean;
    }

    const meanValue = meanList(data.map((item: DataItem) => graph === 'area' ? item.area : item.perimeter));
    const enhancedData = data.map((item: DataItem) => ({
        ...item,
        meanValue,
    }));

    return (

        <div className="p-2 bg-black/15 w-full hover:scale-105">
            <ResponsiveContainer width="100%" height={170}>
                <AreaChart data={enhancedData}>
                    <XAxis dataKey="track_id" interval={10} tick={{ fill: '#ffffff' }}>
                        <Label value="Plant IDs" offset={-5} position="insideBottom" />
                    </XAxis>
                    <YAxis tick={{ fill: '#ffffff' }} label={{ value: 'Pixel^2', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend verticalAlign="top" />
                    <Area
                        type="monotone"
                        dataKey={graph}
                        name={graph === 'area' ? "Area" : "Perimeter"}
                        stroke={graph === 'area' ? "#f3ff00" : "#4aff00"}
                        fill="none"
                    />
                    <Area
                        type="monotone"
                        dataKey="meanValue"
                        name={"Mean " + graph}
                        stroke={graph === 'area' ? "#9e9d3e" : "#5a9e3e"}
                        fill="none"
                    />
                </AreaChart>
            </ResponsiveContainer>
            <div className='flex items-center justify-center p-2 text-white/70'>
            <strong>Graph: {graph} of plants by ID</strong>
            </div>
        </div>
    );
};

export default AreaAndPerimeterLineGraph;