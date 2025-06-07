import { useEffect, useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import Tag, { StatusTag } from "../../components/common/Tag";
import { getData } from "../../api/requests";
import dayjs from "dayjs";
import { translateStatus } from "../../components/common/translateStatus";

interface Rental {
    rentalId: number;
    renterName: string;
    itemName: string;
    requestDate: string;
    status: string;
}

const RentalPage = () => {
    const [rentals, setRentals] = useState<Rental[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchRentals = async () => {
        setLoading(true);
        try {
            const data = await getData(`/api/v1/admin/rentals?page=0&size=100&sort=requestDate,desc`);
            setRentals(data.data.content || []);
        } catch (err) {
            console.error("대여 데이터 로딩 실패:", err);
            setError("대여 데이터를 불러오는 데 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRentals();
    }, []);

    return (
        <div className="flex min-h-screen bg-gray-50 text-black">
            <Sidebar />
            <main className="flex-1 p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">대여 관리</h1>
                    <button className="text-blue-500 text-sm font-medium hover:underline">+ 수기 등록</button>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    {loading ? (
                        <p className="text-gray-500 text-sm">로딩 중...</p>
                    ) : error ? (
                        <p className="text-red-500 text-sm">{error}</p>
                    ) : (
                        <table className="w-full text-sm text-left">
                            <thead className="text-gray-500 border-b">
                                <tr>
                                    <th className="py-2">번호</th>
                                    <th className="py-2">사용자</th>
                                    <th className="py-2">물품</th>
                                    <th className="py-2">대여일자</th>
                                    <th className="py-2">상태</th>
                                    <th className="py-2">관리</th>
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
                                            <button className="text-blue-500 text-xs hover:underline">자세히</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </main>
        </div>
    );
};

export default RentalPage;