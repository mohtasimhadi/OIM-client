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
import { CircularityEccentricityProps } from '../types';

type DataItem = {
    track_id: number;
    circularity: number;
    eccentricity: number;
};

const CircularityAndEccentricityLineGraph: React.FC<CircularityEccentricityProps> = ({ data }) => {

    function meanList(numbers: number[]): number {
        if (numbers.length === 0) return 0;
        const mean = numbers.reduce((acc, num) => acc + num, 0) / numbers.length;
        return mean;
    }

    const meanCircularity = meanList(data.map((item: DataItem) => item.circularity));
    const meanEccentricity = meanList(data.map((item: DataItem) => item.eccentricity));

    const enhancedData = data.map((item: DataItem) => ({
        ...item,
        meanCircularity,
        meanEccentricity,
    }));

    return (

        <div className="p-2 bg-black/15 w-full hover:scale-105">
            <div className='p-5'>
                <ResponsiveContainer width="100%" height={350}>
                    <AreaChart data={enhancedData}>
                        <XAxis dataKey="track_id" interval={10} tick={{ fill: '#ffffff' }}>
                            <Label value="Plant IDs" offset={-5} position="insideBottom" />
                        </XAxis>
                        <YAxis tick={{ fill: '#ffffff' }} label={{ value: 'Percentage', angle: -90, position: 'insideLeft' }} />
                        <Tooltip />
                        <Legend verticalAlign="top" />
                        <Area
                            type="monotone"
                            dataKey="circularity"
                            name="Circularity"
                            stroke="#0078ff"
                            fill="none"
                        />
                        <Area
                            type="monotone"
                            dataKey="meanCircularity"
                            name="Mean Circularity"
                            stroke="#346dad"
                            fill="none"
                        />
                        <Area
                            type="monotone"
                            dataKey="eccentricity"
                            name="Eccentricity"
                            stroke="#c500ff"
                            fill="none"
                        />
                        <Area
                            type="basisOpen"
                            dataKey="meanEccentricity"
                            name="Mean Eccentricity"
                            stroke="#7434ad"
                            fill="none"
                        />
                    </AreaChart>
                </ResponsiveContainer>
                <div className='flex items-center justify-center p-5 text-white/70'>
                    <strong>Graph: Eccentricity and Circularity of plants by ID</strong>
                </div>
            </div>
        </div>
    );
};

export default CircularityAndEccentricityLineGraph;
