import { useEffect, useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import Tag, { StatusTag } from "../../components/common/Tag";
import { getData } from "../../api/requests";
import dayjs from "dayjs";
import { translateStatus } from "../../components/common/translateStatus";
import { useNavigate } from "react-router-dom";

interface Rental {
    rentalId: number;
    renterName: string;
    itemName: string;
    requestDate: string;
    status: string;
}

const statusOptions = [
    { label: "전체", value: "" },
    { label: "대여신청", value: "REQUESTED" },
    { label: "승낙됨", value: "APPROVED" },
    { label: "거절됨", value: "REJECTED" },
    { label: "취소됨", value: "CANCELLED" },
    { label: "사물함 대기중", value: "LEFT_IN_LOCKER" },
    { label: "대여중", value: "PICKED_UP" },
    { label: "반납 대기중", value: "RETURNED_TO_LOCKER" },
    { label: "완료됨", value: "COMPLETED" },
    { label: "연체", value: "DELAYED" },
]

const RentalPage = () => {
    const navigate = useNavigate();

    const [rentals, setRentals] = useState<Rental[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [statusFilter, setStatusFilter] = useState("");
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchRentals = async () => {
            setLoading(true);
            try {
                const query = new URLSearchParams();
                if (statusFilter) query.append("statuses", statusFilter);
                query.append("page", page.toString());
                query.append("size", "10");
                query.append("sort", "requestDate,desc");

                const data = await getData(`/api/v1/admin/rentals?${query.toString()}`);
                setRentals(data.data.content || []);
                setTotalPages(data.data.totalPages || 1);
            } catch (err) {
                console.error("대여 데이터 로딩 실패:", err);
                setError("대여 데이터를 불러오는 데 실패했습니다.");
            } finally {
                setLoading(false);
            }
        };
        
        fetchRentals();
    }, [statusFilter, page]);

    return (
        <div className="flex min-h-screen bg-gray-50 text-black">
            <Sidebar />
            <main className="flex-1 p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">대여 관리</h1>
                </div>

                {/* 필터 */}
                <div className="mb-4">
                    <label>대여 상태: </label>
                    <select
                        value={statusFilter}
                        onChange={(e) => {
                            setStatusFilter(e.target.value);
                            setPage(0);
                        }}
                        className="px-3 py-2 border border-gray-300 rounded text-sm"
                    >
                        {statusOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="bg-white p-4 rounded shadow">
                    {loading ? (
                        <p className="text-gray-500 text-sm">로딩 중...</p>
                    ) : error ? (
                        <p className="text-red-500 text-sm">{error}</p>
                    ) : rentals.length === 0 ? (
                        <p className="text-gray-500 text-sm">데이터가 없습니다.</p>
                    ) : (
                        <table className="w-full text-sm text-left">
                            <thead className="text-gray-500 border-b">
                                <tr>
                                    <th className="py-2">대여 ID</th>
                                    <th className="py-2">사용자</th>
                                    <th className="py-2">물품명</th>
                                    <th className="py-2">대여 요청 일자</th>
                                    <th className="py-2">상태</th>
                                    <th className="py-2">자세히</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rentals.map(({ rentalId, renterName, itemName, requestDate, status }) => (
                                    <tr key={rentalId} className="border-b hover:bg-gray-50">
                                        <td className="py-2">{rentalId}</td>
                                        <td className="py-2">{renterName}</td>
                                        <td className="py-2">{itemName}</td>
                                        <td className="py-2">{dayjs(requestDate).format("YYYY-MM-DD")}</td>
                                        <td className="py-2"><Tag status={translateStatus(status) as StatusTag} /></td>
                                        <td className="py-2">
                                            <button 
                                                className="text-blue-500 text-xs hover:underline"
                                                    onClick={() => navigate(`/rental/${rentalId}`)}
                                            >
                                                자세히
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    {/* 페이지네이션 */}
                    <div className="mt-4 flex justify-end items-center gap-2">
                        <button
                            onClick={() => setPage((p) => Math.max(0, p - 1))}
                            disabled={page === 0}
                            className="px-3 py-1 text-sm border rounded disabled:text-gray-400"
                        >
                            이전
                        </button>
                        <span className="texet-sm">
                            페이지 {page + 1} / {totalPages}
                        </span>
                        <button
                            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                            disabled={page >= totalPages - 1}
                            className="px-3 py-1 text-sm border rounded disabled:text-gray-400"
                        >
                            다음
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default RentalPage;