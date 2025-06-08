import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getData } from '../../api/requests';
import { translateStatus } from '../common/translateStatus';
import { RENTAL_STATUS_LIST } from '../common/rentalStatusList';

export type RentalStatus = typeof RENTAL_STATUS_LIST[number];

const RENTAL_COLORS: Record<RentalStatus, string> = {
    REQUESTED: '#60A5FA',
    APPROVED: '#34D399',
    REJECTED: '#9CA3AF',
    CANCELLED: '#D1D5DB',
    LEFT_IN_LOCKER: '#F472B6',
    PICKED_UP: '#818CF8',
    RETURNED_TO_LOCKER: '#FBBF24',
    COMPLETED: '#10B981',
    DELAYED: '#F87171',
};

interface ChartData {
    name: RentalStatus;
    value: number;
}

const ChartCard = () => {
    const [data, setData] = useState<ChartData[]>([]);

    useEffect(() => {
        const fetchRentalStats = async () => {
            try {
                const res = await getData('/api/v1/admin/rentals');
                const rentals: { status: RentalStatus }[] = res.data.content || [];

                const countMap: Record<RentalStatus, number> = Object.fromEntries(
                    RENTAL_STATUS_LIST.map((status) => [status, 0])
                ) as Record<RentalStatus, number>;

                rentals.forEach((rental) => {
                    if (rental.status in countMap) {
                        countMap[rental.status]++;
                    }
                });

                const chartData: ChartData[] = RENTAL_STATUS_LIST
                .map((status) => ({
                    name: status,
                    value: countMap[status],
                }))
                .filter((item) => item.value > 0);

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
                                `${translateStatus(name)} (${(percent * 100).toFixed(0)}%)`
                            }
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={RENTAL_COLORS[entry.name] ?? '#D1D5DB'}
                                />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(value, name) => [value, translateStatus(name as string)]}
                        />
                        <Legend
                            formatter={(value) => translateStatus(value as string)}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ChartCard;