import { useEffect, useState } from "react";
import { getData } from "../../api/requests";
import dayjs from "dayjs";

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
        const items = res.data.content;

        let available = 0, out = 0, today = 0;
        const todayStr = dayjs().format("YYYY-MM-DD");

        items.forEach((item: any) => {
          if (item.status === "AVAILABLE") available++;
          if (item.status === "OUT") out++;
          if (item.createdAt && item.createdAt.startsWith(todayStr)) today++;
        });

        setStats({
          available,
          out,
          total: res.data.totalElements,
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
      <h2 className="text-lg font-semibold mb-2">물품 상태 및 통계</h2>
      <ul className="space-y-2 text-sm text-gray-700">
        <li className="flex justify-between">
          <span>대여 가능</span>
          <span className="font-semibold text-green-600">{stats.available}개</span>
        </li>
        <li className="flex justify-between">
          <span>대여 중</span>
          <span className="font-semibold text-blue-600">{stats.out}개</span>
        </li>
        <li className="flex justify-between">
          <span>오늘 등록</span>
          <span className="font-semibold text-purple-600">{stats.today}개</span>
        </li>
        <li className="flex justify-between">
          <span>전체 물품</span>
          <span className="font-semibold text-gray-800">{stats.total}개</span>
        </li>
      </ul>
    </div>
  );
};

export default ItemStateChart;
