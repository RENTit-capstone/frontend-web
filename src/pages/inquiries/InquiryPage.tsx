import { useEffect, useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import { getData } from "../../api/requests";
import dayjs from "dayjs";

interface Inquiry {
    inquiryId: number;
    title: string;
    createdAt: string;
}

const InquiryPage = () => {
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchInquiries = async () => {
            try {
                const data = await getData("/api/v1/admin/inquiries?processed=false&page=0&size=20");
                setInquiries(data.content || []);
            } catch (err) {
                setError("문의 목록을 불러오는 데 실패했습니다.");
                console.error("InquiryPage fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchInquiries();
    }, []);

    return (
        <div className="flex min-h-screen bg-gray-50 text-black">
            <Sidebar />
            <main className="flex-1 p-6">
                <h1 className="text-2xl font-bold mb-6">문의 조회</h1>
                {/* 필터 영역 */}
                <div className="flex gap-4 mb-4">
                    <input 
                        type="text"
                        placeholder="검색어 입력"   
                        className="px-3 py-2 border border-gray-300 rounded text-sm w-60"
                    />
                    <input
                        type="date"
                        className="px-3 py-2 border border-gray-300 rounded text-sm"
                    />
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
                        <table className="w-full text-sm text-left">
                            <thead className="text-gray-500 border-b">
                                <tr>
                                    <th className="py-2">번호</th>
                                    <th className="py-2">제목</th>
                                    <th className="py-2">작성일자</th>
                                    <th className="py-2">관리</th>
                                </tr>
                            </thead>
                            <tbody>
                                {inquiries.map(({ inquiryId, title, createdAt }) => (
                                    <tr key={inquiryId} className="border-b hover:bg-gray-50">
                                        <td className="py-2">{inquiryId}</td>
                                        <td className="py-2">{title}</td>
                                        <td className="py-2">{dayjs(createdAt).format('YYYY-MM-DD')}</td>
                                        <td className="py-2">
                                            <button className="text-blue-500 text-xs hover:underline">
                                                상세 보기 →
                                            </button>
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

export default InquiryPage;