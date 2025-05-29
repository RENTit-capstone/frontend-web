import React from "react";
import Tag from "../comman/Tag";

const dummyData = [
    { id: 1, user: '김민수', item: '노트북', date: '2025-05-20', status: '대여중' },
    { id: 2, user: '이영희', item: '빔프로젝터', date: '2025-05-18', status: '반납중' },
    { id: 3, user: '박지후', item: '캠코더', date: '2025-05-15', status: '연체' },
];

const RentalTableCard = () => {
    return (
        <div className="bg-white p-4 rounded shadow">
            {/* 상단 텍스트 + 링크 */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-1g font-semibold">대여 관리</h2>
                <a href="#" className="text-sm text-blue-500 hover:underline">
                    전체 보기 →
                </a>
            </div>

            {/* 테이블 */}
            <table className="w-full text-sm text-left">
                <thead className="text-gray-500 border-b">
                    <tr>
                        <th className="py-2">번호</th>
                        <th className="py-2">사용자</th>
                        <th className="py-2">물품</th>
                        <th className="py-2">대여일자</th>
                        <th className="py-2">상태</th>
                    </tr>
                </thead>
                <tbody>
                    {dummyData.map(({ id, user, item, date, status }) => (
                        <tr key={id} className="border-b hover:bg-gray-50">
                            <td className="py-2">{id}</td>
                            <td className="py-2">{user}</td>
                            <td className="py-2">{item}</td>
                            <td className="py-2">{date}</td>
                            <td className="py-2">
                                <Tag status={status as any} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RentalTableCard;