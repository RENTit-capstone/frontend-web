import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getData } from "../../api/requests";
import Sidebar from "../../components/layout/Sidebar";
import Tag, { StatusTag } from "../../components/common/Tag";
import { translateStatus } from "../../components/common/translateStatus";
import dayjs from "dayjs";

interface RentalDetail {
    rentalId: number;
    itemId: number;
    itemName: string;
    ownerName: string;
    renterName: string;
    status: string;
    requestDate: string;
    approvedDate: string | null;
    rejectedDate: string | null;
    startDate: string;
    dueDate: string;
    leftAt: string | null;
    pickedUpAt: string | null;
    returnedAt: string | null;
    retrievedAt: string | null;
    thumbnailUrl: string | null;
    lockerUniversity: string | null;
    lockerLocation: string | null;
    lockerNumber: number | null;
}

const RentalDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [detail, setDetail] = useState<RentalDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDetail = async () => {
            setLoading(true);
            try {
                const data = await getData(`/api/v1/admin/rentals?page=0&size=1000`);
                const allRentals = data.data.content || [];
                const found = allRentals.find((r: RentalDetail) => String(r.rentalId) === id);
                if (!found) {
                    setError("해당 대여 정보를 찾을 수 없습니다.");
                    return;
                }
                setDetail(found);
            } catch (err) {
                console.error(err);
                setError("대여 정보를 불러오는 데 실패했습니다.");
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchDetail();
    }, [id]);

    if (loading) return <div className="p-6">로딩 중...</div>;
    if (error || !detail) return <div className="p-6 text-red-500">{error}</div>;

    return (
        <div className="flex min-h-screen bg-gray-50 text-black">
            <Sidebar />
            <main className="flex-1 p-6">
                <h1 className="text-2xl font-bold mb-4">대여 상세</h1>
                <div className="bg-white p-4 rounded shadow space-y-3">
                    <div><strong>대여 ID:</strong> {detail.rentalId}</div>
                    <div><strong>대여 상태:</strong> <Tag status={translateStatus(detail.status) as StatusTag} /></div>

                    <div><strong>대여자:</strong> {detail.renterName}</div>
                    <div><strong>소유자:</strong> {detail.ownerName}</div>
                    <div><strong>물품 이름:</strong> {detail.itemName}</div>
                    <div><strong>요청 일시:</strong> {dayjs(detail.requestDate).format("YYYY-MM-DD HH:mm")}</div>
                    <div><strong>대여 시작일:</strong> {dayjs(detail.startDate).format("YYYY-MM-DD")}</div>
                    <div><strong>반납 예정일:</strong> {dayjs(detail.dueDate).format("YYYY-MM-DD")}</div>

                    {detail.approvedDate && (
                        <div><strong>승인 일시:</strong> {dayjs(detail.approvedDate).format("YYYY-MM-DD HH:mm")}</div>
                    )}
                    {detail.rejectedDate && (
                        <div><strong>거절 일시:</strong> {dayjs(detail.rejectedDate).format("YYYY-MM-DD HH:mm")}</div>
                    )}
                    {detail.leftAt && <div><strong>사물함 맡김:</strong> {dayjs(detail.leftAt).format("YYYY-MM-DD HH:mm")}</div>}
                    {detail.pickedUpAt && <div><strong>픽업:</strong> {dayjs(detail.pickedUpAt).format("YYYY-MM-DD HH:mm")}</div>}
                    {detail.returnedAt && <div><strong>반납:</strong> {dayjs(detail.returnedAt).format("YYYY-MM-DD HH:mm")}</div>}
                    {detail.retrievedAt && <div><strong>회수:</strong> {dayjs(detail.retrievedAt).format("YYYY-MM-DD HH:mm")}</div>}

                    {detail.thumbnailUrl && (
                        <div>
                            <strong>반납 이미지:</strong>
                            <img src={detail.thumbnailUrl} alt="반납 이미지" className="w-32 h-32 object-cover border mt-2" />
                        </div>
                    )}

                    {detail.lockerUniversity && (
                        <div>
                            <strong>사물함 위치:</strong> {detail.lockerUniversity} / {detail.lockerLocation} #{detail.lockerNumber}
                        </div>
                    )}

                    <button
                        onClick={() => navigate("/rental")}
                        className="mt-4 text-blue-500 hover:underline text-sm"
                    >
                        ← 목록으로 돌아가기
                    </button>
                </div>
            </main>
        </div>
    );
};

export default RentalDetailPage;
