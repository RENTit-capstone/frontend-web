import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getData } from '../../api/requests';

const RENTAL_COLORS: Record<string, string> = {
  REQUESTED: '#60A5FA',  // blue-400
  APPROVED: '#34D399',   // green-400
  RETURNED_TO_LOCKER: '#FBBF24', // yellow-400
  DELAYED: '#F87171',    // red-400
};

const ChartCard = () => {
    const [data, setData] = useState<{ name: string; value: number }[]>([]);

    useEffect(() => {
        const fetchRentalStats = async () => {
            try {
            const res = await getData('/api/v1/admin/rentals?page=0&size=1000');
            const rentals = res.data.content;

            const countMap: Record<string, number> = {
                REQUESTED: 0,
                APPROVED: 0,
                RETURNED_TO_LOCKER: 0,
                DELAYED: 0,
            };

            rentals.forEach((rental: any) => {
                const status = rental.status;
                if (countMap[status] !== undefined) countMap[status]++;
            });

            const chartData = Object.entries(countMap).map(([key, value]) => ({
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
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
            >
                {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={RENTAL_COLORS[entry.name]} />
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