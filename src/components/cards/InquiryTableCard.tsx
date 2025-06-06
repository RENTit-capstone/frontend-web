import { useEffect, useState } from "react";
import { getData } from "../../api/requests";

interface Inquiry {
    inquiryId: number;
    memberId: number;
    type: string;
    title: string;
    processed: boolean;
    createdAt: string;
}

const InquiryTableCard = () => {
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchInquiries = async () => {
            try {
                setLoading(true);
                const data = await getData('/api/v1/admin/inquiries?page=0&size=5');
                setInquiries(data.content);
            } catch (err) {
                setError('문의 데이터를 불러오는 데 실패했습니다.');
                console.log("Error while fetching inquiries data:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchInquiries();
    }, []);

    return (
        <div className="bg-white p-4 rounded shadow">
            {/* 상단 제목 및 링크 */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-1g font-semibold">문의 조회</h2>
                <a href="#" className="text-sm text-blue-500 hover:underline">
                    전체 보기 →
                </a>
            </div>

            {loading ? (
                <p className="text-sm text-gray-500">로딩 중...</p>
            ) : error ? (
                <p className="text-sm text-red-500">{error}</p>
            ) : inquiries.length === 0 ? (
                <p className="text-sm test-gray-500">등록된 문의가 없습니다.</p>
            ) : (
                <table className="w-full text-sm text-left">
                    <thead className="text-gray-500 border-b">
                        <tr>
                            <th className="py-2">번호</th>
                            <th className="py-2">제목</th>
                            <th className="py-2">작성일자</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inquiries.map(({ inquiryId, title, createdAt }) => (
                            <tr key={inquiryId} className="border-b hover:bg-gray-50">
                                <td className="py-2">{inquiryId}</td>
                                <td className="py-2">{title}</td>
                                <td className="py-2">{new Date(createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default InquiryTableCard