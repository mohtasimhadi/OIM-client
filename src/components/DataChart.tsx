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
import { PlantDetailsProps } from '../types';

type DataItem = {
    track_id: number;
    circularity: number;
    eccentricity: number;
};

const CircularityAndEccentricityLineGraph: React.FC<PlantDetailsProps> = ({ data }) => {

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

                <div className="p-6 rounded-lg bg-white/15 mt-5 w-full">
                    <ResponsiveContainer width="100%" height={350}>
                        <AreaChart data={enhancedData}>
                            <XAxis dataKey="track_id" interval={10} tick={{ fill: '#ffffff' }}>
                            <Label value="Plant IDs" offset={-5} position="insideBottom"/>
                            </XAxis>
                            <YAxis tick={{ fill: '#ffffff' }} />
                            <Tooltip />
                            <Legend verticalAlign="top" />
                            <Area
                                type="monotone"
                                dataKey="circularity"
                                name="Circularity"
                                stroke="#8884d8"
                                fill="none"
                            />
                            <Area
                                type="monotone"
                                dataKey="meanCircularity"
                                name="Mean Circularity"
                                stroke="#8884d8"
                                fill="none"
                            />
                            <Area
                                type="basisOpen"
                                dataKey="eccentricity"
                                name="Eccentricity"
                                stroke="#82ca9d"
                                fill="none"
                            />
                            <Area
                                type="basisOpen"
                                dataKey="meanEccentricity"
                                name="Mean Eccentricity"
                                stroke="#82ca9d"
                                fill="none"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            );
};

export default CircularityAndEccentricityLineGraph;
