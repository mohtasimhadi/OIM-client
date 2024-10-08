import React, { useRef, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Tooltip,
    Legend,
    ChartData,
    ChartOptions,
} from 'chart.js';

// Register components
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

const Dashboard: React.FC = () => {
    const chartRef = useRef<ChartJS | null>(null); // Update type here

    // Placeholder data
    const batteryLevel = 75; // in percentage
    const gpsLocation = { lat: '37.7749', lon: '-122.4194' }; // Example coordinates
    const speed = 10; // km/h
    const temperature = 45; // in Celsius
    const imagesCaptured = 150; // Number of images captured
    const obstaclesDetected = 2; // Number of detected obstacles
    const currentWaypoint = 3; // Current waypoint index
    const totalWaypoints = 10; // Total waypoints

    // Sample chart data for speed trends
    const speedData: ChartData<'line'> = {
        labels: ['1 PM', '2 PM', '3 PM', '4 PM', '5 PM'],
        datasets: [
            {
                label: 'Speed (km/h)',
                data: [5, 10, 15, 10, 20],
                fill: false,
                backgroundColor: 'green',
                borderColor: 'rgba(75,192,192,1)',
            },
        ],
    };

    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.destroy(); // Clean up previous chart instance
        }
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Rover Control Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/20 shadow-md rounded-lg p-4">
                    <h2 className="text-xl font-semibold">Battery Level</h2>
                    <p className="text-2xl">{batteryLevel}%</p>
                </div>
                <div className="bg-white/20 shadow-md rounded-lg p-4">
                    <h2 className="text-xl font-semibold">GPS Location</h2>
                    <p className="text-2xl">Lat: {gpsLocation.lat}, Lon: {gpsLocation.lon}</p>
                </div>
                <div className="bg-white/20 shadow-md rounded-lg p-4">
                    <h2 className="text-xl font-semibold">Speed</h2>
                    <p className="text-2xl">{speed} km/h</p>
                </div>
                <div className="bg-white/20 shadow-md rounded-lg p-4">
                    <h2 className="text-xl font-semibold">Temperature</h2>
                    <p className="text-2xl">{temperature} °C</p>
                </div>
                <div className="bg-white/20 shadow-md rounded-lg p-4">
                    <h2 className="text-xl font-semibold">Images Captured</h2>
                    <p className="text-2xl">{imagesCaptured}</p>
                </div>
                <div className="bg-white/20 shadow-md rounded-lg p-4">
                    <h2 className="text-xl font-semibold">Obstacles Detected</h2>
                    <p className="text-2xl">{obstaclesDetected}</p>
                </div>
                <div className="bg-white/20 shadow-md rounded-lg p-4">
                    <h2 className="text-xl font-semibold">Current Waypoint</h2>
                    <p className="text-2xl">{currentWaypoint} / {totalWaypoints}</p>
                </div>
                <div className="col-span-2 bg-white/20 shadow-md rounded-lg p-4 text-white">
                    <h2 className="text-xl font-semibold">Speed Trend</h2>
                    {/* <Line ref={chartRef} data={speedData} /> */}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
