import { useEffect, useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import { getData } from "../../api/requests";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import StatusBadge from "../../components/common/InquiryStatusBadge";
import InquiryTypeBadge from "../../components/common/InquiryTypeBadge";

interface Inquiry {
    inquiryId: number;
    title: string;
    type: string;
    createdAt: string;
    processed: boolean;
}

const InquiryPage = () => {
    const navigate = useNavigate();

    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [type, setType] = useState<string>("");
    const [processed, setProcessed] = useState<string>("");
    const [page, setPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(1);

    const fetchInquiries = async () => {
        setLoading(true);
        try {
            const query = new URLSearchParams();
            query.set("page", String(page));
            query.set("size", "10");

            if (type) query.set("type", type);
            if (processed) query.set("processed", processed);

            const url = `/api/v1/admin/inquiries?${query.toString()}`;
            console.log(url);
            const data = await getData(url);
            setInquiries(data.data.content || []);
            setTotalPages(data.data.totalPages || 1);
        } catch (err) {
            setError("문의 목록을 불러오는 데 실패했습니다.");
            console.error("InquiryPage fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setPage(0);
    }, [type, processed]);
    
    useEffect(() => {
        fetchInquiries();
    }, [page, type, processed]);

    return (
        <div className="flex min-h-screen bg-gray-50 text-black">
            <Sidebar />
            <main className="flex-1 p-6">
                <h1 className="text-2xl font-bold mb-6">문의 조회</h1>
                {/* 필터 영역 */}
                <div className="mb-4">
                    <strong>문의 유형: </strong>
                    <select 
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded text-sm"
                    >
                        <option value="">전체 유형</option>
                        <option value="SERVICE">서비스 이용 문의</option>
                        <option value="REPORT">신고/제보 문의</option>
                        <option value="DAMAGE">파손 신고</option>
                    </select>
                    <strong> 처리 상태: </strong>
                    <select
                        value={processed}
                        onChange={(e) => setProcessed(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded text-sm"
                    >
                        <option value="">전체 상태</option>
                        <option value="false">미처리</option>
                        <option value="true">처리됨</option>
                    </select>
                </div>

                {/* 테이블 */}
                <div className="bg-white p-4 rounded shadow">
                    {loading ? (
                        <p className="text-sm text-gray-500">로딩 중...</p>
                    ) : error ? (
                        <p className="teext-sm text-red-500">{error}</p>
                    ) : inquiries.length === 0 ? (
                        <p className="text-sm text-gray-500">문의가 없습니다.</p>
                    ) : (
                        <>
                            <table className="w-full text-sm text-left">
                                <thead className="text-gray-500 border-b">
                                    <tr>
                                        <th className="py-2">번호</th>
                                        <th className="py-2">제목</th>
                                        <th className="py-2">유형</th>
                                        <th className="py-2">작성일자</th>
                                        <th className="py-2">처리 상태</th>
                                        <th className="py-2">관리</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {inquiries.map(({ inquiryId, title, type, createdAt, processed }) => (
                                        <tr key={inquiryId} className="border-b hover:bg-gray-50">
                                            <td className="py-2">{inquiryId}</td>
                                            <td className="py-2">{title}</td>
                                            <td className="py-2"><InquiryTypeBadge type={type}/></td>
                                            <td className="py-2">{dayjs(createdAt).format('YYYY-MM-DD')}</td>
                                            <td className="py-2"><StatusBadge processed={processed} /></td>
                                            <td className="py-2">
                                                <button
                                                    className="text-blue-500 text-xs hover:underline"
                                                    onClick={() => navigate(`/inquiry/${inquiryId}`)}
                                                >
                                                    상세 보기 →
                                                </button>
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
                                    이전
                                </button>
                                <span className="texet-sm">
                                    페이지 {page + 1} / {totalPages}
                                </span>
                                <button
                                    onClick={() => setPage((p) => Math.max(totalPages - 1, p + 1))}
                                    disabled={page >= totalPages - 1}
                                    className="px-3 py-1 text-sm border rounded disabled:text-gray-400"
                                >
                                    다음
                                </button>
                            </div>
                        </>
                    )}
                    
                </div>
            </main>
        </div>
    );
};

export default InquiryPage;