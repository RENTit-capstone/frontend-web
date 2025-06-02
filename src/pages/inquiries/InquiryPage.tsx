import Sidebar from "../../components/layout/Sidebar";

const dummyInquiries = [
    { id: 101, title: '대여 기간 변경 문의', createdAt: '2025-05-21' },
    { id: 102, title: '물품 상태 이상 신고', createdAt: '2025-05-20' },
    { id: 103, title: '회원정보 수정 관련', createdAt: '2025-05-18' },
];

const InquiryPage = () => {
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
                            {dummyInquiries.map(({ id, title, createdAt }) => (
                                <tr key={id} className="border-b hover:bg-gray-50">
                                    <td className="py-2">{id}</td>
                                    <td className="py-2">{title}</td>
                                    <td className="py-2">{createdAt}</td>
                                    <td className="py-2">
                                        <button className="text-blue-500 text-xs hover:underline">
                                            상세 보기 →
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

export default InquiryPage;