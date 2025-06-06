import { useEffect, useState } from 'react';
import { getData } from "../../api/requests";
import Tag from "../common/Tag";
import { translateStatus } from '../common/translateStatus';

interface Rental {
    rentalId: number;
    itemName: string;
    renterName: string;
    requestDate: string;
    status: string;
}

const RentalTableCard = () => {
    const [rentals, setRentals] = useState<Rental[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRentals = async () => {
            try {
                setLoading(true);
                const data = await getData(
                    `/api/v1/admin/rentals?statuses=APPROVED&statuses=REQUESTED&page=0&size=5&sort=requestDate,desc`
                );
                setRentals(data.content || []);
            } catch (err) {
                setError('대여 목록을 불러오지 못했습니다.');
                console.log("Error occured in fetching rental list: ", err);
            } finally {
                setLoading(false);
            }
        };
        fetchRentals();
    }, []);

    return (
        <div className="bg-white p-4 rounded shadow">
            {/* 상단 텍스트 + 링크 */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">대여 관리</h2>
                <a href="#" className="text-sm text-blue-500 hover:underline">
                    전체 보기 →
                </a>
            </div>

            {/* 테이블 */}
            {loading ? (
                <p className="text-sm text-gray-500">로딩 중...</p>
            ) : error ? (
                <p className="text-sm text-red-500">{error}</p>
            ) : rentals.length === 0 ? (
                <p className="text-sm text-gray-500">현재 완료되지 않은 대여 내역이 없습니다.</p>
            ) : (
                <table className="w-full text-sm text-left">
                    <thead className="text-gray-500 border-b">
                        <tr>
                            <th className="py-2">번호</th>
                            <th className="py-2">사용자</th>
                            <th className="py-2">물품</th>
                            <th className="py-2">요청일자</th>
                            <th className="py-2">상태</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rentals.map(({ rentalId, itemName, renterName, requestDate, status }) => (
                            <tr key={rentalId} className="border-b hover:bg-gray-50 text-gray-700">
                                <td className="py-2">{rentalId}</td>
                                <td className="py-2 font-medium">{renterName}</td>
                                <td className="py-2 font-medium">{itemName}</td>
                                <td className="py-2">{new Date(requestDate).toLocaleDateString()}</td>
                                <td className="py-2">
                                    <Tag status={translateStatus(status)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            )}
            
        </div>
    );
};

export default RentalTableCard;