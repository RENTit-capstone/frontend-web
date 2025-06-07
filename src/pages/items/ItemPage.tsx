import { useEffect, useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import Tag, { StatusTag } from "../../components/common/Tag";
import { getData } from "../../api/requests";

interface Item {
    itemId: number;
    name: string;
    status: string;
    owner: {
        memberId: number;
        nickname: string;
        university: string;
    };
    price: number;
}

const translateStatus = (status: string): StatusTag => {
    switch (status) {
        case "AVAILABLE":
            return "대여가능";
        case "OUT":
            return "대여중";
        default:
            return "대여가능";
    }
};

const ItemPage = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [keyword, setKeyword] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    const [page, setPage] = useState<number>(0);
    const itemsPerPage = 10;

    const fetchItems = async () => {
        setLoading(true);
        try {
            const query = new URLSearchParams();
            query.set("page", "0");
            query.set("size", "25");
            query.set("sort", "createdAt,desc");
            if (keyword) query.set("keyword", keyword);

            const res = await getData(`/api/v1/items?${query.toString()}`);
            setItems(res.data.content || []);
        } catch (err) {
            console.error("물품 목록 불러오기 실패:", err);
            setError("물품 목록을 불러오는 데 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, [keyword]);

    const filteredItems = items.filter((item) => {
        if (!statusFilter) return true;
        return item.status === statusFilter;
    });

    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const currentItems = filteredItems.slice(
        page * itemsPerPage,
        (page + 1) * itemsPerPage
    );

    return (
        <div className="flex min-h-screen bg-gray-50 text-black">
            <Sidebar />
            <main className="flex-1 p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold mb-6">물품 관리</h1>
                </div>

                {/* 필터 영역 */}
                <div className="mb-4 flex gap-4 items-center">
                    <input
                        type="text"
                        placeholder="검색어 입력"
                        value={keyword}
                        onChange={(e) => {
                            setKeyword(e.target.value);
                            setPage(0);
                        }}
                        className="px-3 py-2 border border-gray-300 rounded text-sm w-60"
                    />
                    <select
                        value={statusFilter}
                        onChange={(e) => {
                            setStatusFilter(e.target.value);
                            setPage(0);
                        }}
                        className="px-3 py-2 border border-gray-300 rounded text-sm"
                    >
                        <option value="">전체 상태</option>
                        <option value="AVAILABLE">대여가능</option>
                        <option value="OUT">대여중</option>
                    </select>
                </div>

                {/* 테이블 */}
                <div className="bg-white p-4 rounded shadow">
                    {loading ? (
                        <p className="text-sm text-gray-500">로딩 중...</p>
                    ) : error ? (
                        <p className="text-sm text-red-500">{error}</p>
                    ) : filteredItems.length === 0 ? (
                        <p className="text-sm text-gray-500">표시할 물품이 없습니다.</p>
                    ) : (
                        <>
                            <table className="w-full text-sm text-left">
                                <thead className="text-gray-500 border-b">
                                    <tr>
                                        <th className="py-2">물품ID</th>
                                        <th className="py-2">물품명</th>
                                        <th className="py-2">소유자</th>
                                        <th className="py-2">상태</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems.map(({ itemId, name, owner, status }) => (
                                        <tr key={itemId} className="border-b hover:bg-gray-50">
                                            <td className="py-2">{itemId}</td>
                                            <td className="py-2">{name}</td>
                                            <td className="py-2">
                                                {owner.nickname} / {owner.university}
                                            </td>
                                            <td className="py-2">
                                                <Tag status={translateStatus(status) as StatusTag} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* 페이지네이션 */}
                            <div className="mt-4 flex justify-end items-center gap-2">
                                <button
                                    onClick={() => setPage((p) => Math.max(0, p - 1))}
                                    disabled={page === 0}
                                    className="px-3 py-1 text-sm border rounded disabled:text-gray-400"
                                >
                                    ← 이전
                                </button>
                                <span className="text-sm">
                                    페이지 {page + 1} / {totalPages}
                                </span>
                                <button
                                    onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                                    disabled={page >= totalPages - 1}
                                    className="px-3 py-1 text-sm border rounded disabled:text-gray-400"
                                >
                                    다음 →
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </main>
        </div>
    );
};

export default ItemPage;
