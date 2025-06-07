import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getData, putData } from "../../api/requests";
import dayjs from "dayjs";
import Sidebar from "../../components/layout/Sidebar";

interface InquiryDetail {
    inquiryId: number;
    memberId: number;
    type: string;
    title: string;
    content: string;
    answer: string | null;
    images: string[] | null;
    processed: boolean;
    createdAt: string;
}

const InquiryDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [detail, setDetail] = useState<InquiryDetail | null>(null);
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchDetail = async () => {
        setLoading(true);
        try {
            const data = await getData(`/api/v1/admin/inquiries/${id}`);
            console.log(data);
            setDetail(data.data);
            setAnswer(data.data.answer || "");
        } catch (err) {
            alert("문의 정보를 불러오지 못했습니다.");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        try {
            await putData(`/api/v1/admin/inquiries/${id}/answer`, { answer });
            await putData(`/api/v1/admin/inquiries/${id}/processed`);
            alert("답변이 등록되고 문의가 처리됨 상태로 변경되었습니다.");
            navigate("/inquiry");
        } catch (err) {
            alert("답변 등록에 실패했습니다.");
        }
    };

    useEffect(() => {
        if (id) fetchDetail();
    }, [id]);

    if (loading || !detail) return <div>로딩 중...</div>

    return (
        <div className="flex min-h-screen bg-gray-50 text-black">
            <Sidebar />
            <main className="flex-1 p-6">
                <h1 className="text-2xl font-bold mb-4">문의 상세</h1>

                <div className="bg-white p-4 rounded shadow space-y-4">
                    <div>
                        <strong>문의 ID:</strong> {detail.inquiryId}
                    </div>
                    <div>
                        <strong>작성자 ID:</strong> {detail.memberId}
                    </div>
                    <div>
                        <strong>유형:</strong> {detail.type}
                    </div>
                    <div>
                        <strong>제목:</strong> {detail.title}
                    </div>
                    <div>
                        <strong>내용:</strong><p className="whitespace-pre-wrap">{detail.content}</p>
                    </div>
                    {detail.images && detail.images.length > 0 && (
                        <div>
                            <strong>이미지:</strong>
                            <div className="flex gap-2 mt-2">
                                {detail.images.map((url, idx) => (
                                    <img key={idx} src={url} alt="첨부" className="w-32 h-32 object-cover border" />
                                ))}
                            </div>
                        </div>
                    )}
                    <div>
                        <strong>작성일자:</strong> {dayjs(detail.createdAt).format("YYYY-MM-DD HH:mm")}
                    </div>
                    <div>
                        <strong>답변:</strong>
                        <textarea 
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            rows={6}
                            className="w-full mt-1 p-2 border rounded"
                        />
                    </div>
                    <button
                        onClick={handleSubmit}
                        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        답변 등록 및 처리
                    </button>
                </div>
            </main>
        </div>
    )
}

export default InquiryDetailPage;