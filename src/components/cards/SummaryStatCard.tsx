import React from 'react';

interface SummaryStatCardProps {
    title: string;
    value: string;
    color?: 'blue' | 'red' | 'green' | 'gray';
}

const colorMap = {
    blue: 'bg-blue-100 text-blue-800',
    red: 'bg-red-100 text-red-800',
    green: 'bg-green-100 text-green-800',
    gray: 'bg-gray-100 text-gray-800',
};

const SummaryStatCard: React.FC<SummaryStatCardProps> = ({ title, value, color = 'gray' }) => {
    return (
        <div className={`p-4 rounded shadow ${colorMap[color]} h-full`}>
            <h3 className="text-sm font-medium">{title}</h3>
            <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
    );
};

export default SummaryStatCard;