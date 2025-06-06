import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getData } from '../../api/requests';

const RENTAL_STATUS_LIST = [
    'REQUESTED',
    'APPROVED',
    'REJECTED',
    'CANCELLED',
    'LEFT_IN_LOCKER',
    'PICKED_UP',
    'RETURNED_TO_LOCKER',
    'COMPLETED',
    'DELAYED',
];

const RENTAL_COLORS: Record<string, string> = {
    REQUESTED: '#60A5FA',          // blue-400
    APPROVED: '#34D399',           // green-400
    REJECTED: '#9CA3AF',           // gray-400
    CANCELLED: '#D1D5DB',          // cool-gray-300
    LEFT_IN_LOCKER: '#F472B6',     // pink-400
    PICKED_UP: '#818CF8',          // indigo-400
    RETURNED_TO_LOCKER: '#FBBF24', // yellow-400
    COMPLETED: '#10B981',          // emerald-500
    DELAYED: '#F87171',            // red-400
};

const ChartCard = () => {
    const [data, setData] = useState<{ name: string; value: number }[]>([]);

    useEffect(() => {
        const fetchRentalStats = async () => {
            try {
            const res = await getData('/api/v1/admin/rentals');
            const rentals = res.data.content || [];

            const countMap: Record<string, number> = {};
            RENTAL_STATUS_LIST.forEach((status) => {
                countMap[status] = 0;
            });

            rentals.forEach((rental: any) => {
                const status = rental.status;
                if (status && Object.prototype.hasOwnProperty.call(countMap, status)) {
                    countMap[status]++;
                }
            });

            const chartData = Object.entries(countMap)
                .filter(([, value]) => value > 0)
                .map(([key, value]) => ({
                    name: key,
                    value,
                }));

            setData(chartData);
            } catch (err) {
                console.error('대여 통계 조회 실패:', err);
            }
        };

        fetchRentalStats();
    }, []);

    return (
        <div className="bg-white p-4 rounded shadow h-full">
            <h2 className="text-lg font-semibold mb-2">대여 상태별 통계</h2>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            dataKey="value"
                            label={({ name, percent }) =>
                                `${name} (${(percent * 100).toFixed(0)}%)`
                            }
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={RENTAL_COLORS[entry.name] ?? '#D1D5DB'} // fallback gray
                                />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ChartCard;