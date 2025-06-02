import React from "react";

const dummyInquiries = [
    { id: 1, content: '물품 상태가 이상합니다.', date: '2025-05-28' },
    { id: 2, content: '대여가 완료되지 않았어요.', date: '2025-05-27' },
    { id: 3, content: '예약한 시간이 적용되지 않았습니다.', date: '2025-05-25' },
];

const InquiryTableCard = () => {
    return (
        <div className="bg-white p-4 rounded shadow">
            {/* 상단 제목 및 링크 */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-1g font-semibold">문의 조회</h2>
                <a href="#" className="text-sm text-blue-500 hover:underline">
                    전체 보기 →
                </a>
            </div>

            {/* 테이블 */}
            <table className="w-full text-sm text-left">
                <thead className="text-gray-500 border-b">
                    <tr>
                        <th className="py-2">번호</th>
                        <th className="py-2">내용</th>
                        <th className="py-2">작성일자</th>
                    </tr>
                </thead>
                <tbody>
                    {dummyInquiries.map(({ id, content, date }) => (
                        <tr key={id} className="border-b hover:bg-gray-50">
                            <td className="py-2">{id}</td>
                            <td className="py-2">{content}</td>
                            <td className="py-2">{date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default InquiryTableCard