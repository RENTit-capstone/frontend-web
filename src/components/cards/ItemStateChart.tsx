import { useEffect, useState } from "react";
import { getData } from "../../api/requests";
import dayjs from "dayjs";

interface Item {
    itemId: number;
    status: 'AVAILABLE' | 'OUT';
    createdAt: string;
}

const ItemStateChart = () => {
    const [stats, setStats] = useState({
        available: 0,
        out: 0,
        total: 0,
        today: 0,
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await getData("/api/v1/items?&sort=createdAt,desc");
                const items: Item[] = res.data.content;

                let available = 0, out = 0, today = 0;
                const todayStr = dayjs().format("YYYY-MM-DD");

                items.forEach((item) => {
                    if (item.status === "AVAILABLE") available++;
                    if (item.status === "OUT") out++;
                    if (item.createdAt && item.createdAt.startsWith(todayStr)) today++;
                });

                setStats({
                    available,
                    out,
                    total: items.length,
                    today,
                });
            } catch (err) {
                console.error("물품 통계 조회 실패:", err);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="bg-white p-4 rounded shadow h-full">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold mb-2">물품 상태 및 통계</h2>
                <a href="/items" className="text-sm text-blue-500 hover:underline">
                    전체 보기 →
                </a>
            </div>
            
            <ul className="grid grid-cols-1 gap-2 text-sm text-gray-800 gap-8">
                <li className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                    ✅ <span>대여 가능</span>
                    </span>
                    <span className="text-green-600 font-semibold">{stats.available}개</span>
                </li>
                <li className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                    📦 <span>대여 중</span>
                    </span>
                    <span className="text-blue-600 font-semibold">{stats.out}개</span>
                </li>
                <li className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                    🆕 <span>오늘 등록</span>
                    </span>
                    <span className="text-purple-600 font-semibold">{stats.today}개</span>
                </li>
                <li className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                    📊 <span>전체 물품</span>
                    </span>
                    <span className="text-gray-800 font-semibold">{stats.total}개</span>
                </li>
            </ul>
        </div>
    );
};

export default ItemStateChart;
