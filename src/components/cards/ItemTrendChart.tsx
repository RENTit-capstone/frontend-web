import { useEffect, useState } from "react";
import { getData } from "../../api/requests";
import dayjs from "dayjs";
import Tag, { StatusTag } from "../../components/common/Tag";
import { translateStatus } from "../../components/common/translateStatus";

interface Item {
    itemId: number;
    name: string;
    category: string;
    status: string;
    createdAt: string;
}

const RecentItemsCard = () => {
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const res = await getData("/api/v1/items?sort=createdAt,desc&page=0&size=5");
                setItems(res.data.content || []);
            } catch (err) {
                console.error("최근 등록 물품 조회 실패:", err);
            }
        };

        fetchItems();
    }, []);

    return (
        <div className="bg-white p-4 rounded shadow h-full">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold">최근 등록된 물품</h2>
                <a href="/items" className="text-sm text-blue-500 hover:underline">전체 보기 →</a>
            </div>

            <ul className="text-sm divide-y">
                {items.map((item) => (
                    <li key={item.itemId} className="py-2 flex justify-between items-center">
                        <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-xs text-gray-500">{dayjs(item.createdAt).format("YYYY.MM.DD")} • {item.category}</p>
                        </div>
                        <Tag status={translateStatus(item.status) as StatusTag} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecentItemsCard;