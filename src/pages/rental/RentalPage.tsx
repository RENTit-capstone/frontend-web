import Sidebar from "../../components/layout/Sidebar";
import Tag from "../../components/common/Tag";

const dummyData = [
    { id: 1, user: '김민수', item: '노트북', date: '2025-06-01', status: '대여중' },
    { id: 2, user: '이영희', item: '캠코더', date: '2025-05-28', status: '반납중' },
    { id: 3, user: '박지후', item: '마이크', date: '2025-05-26', status: '연체' },
]

const RentalPage = () => {
    return (
        <div className="flex min-h-screen bg-gray-50 text-black">
            <Sidebar />
            <main className="flex-1 p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">대여 관리</h1>
                    <button className="text-blue-500 text-sm font-medium hover:underline">+ 수기 등록</button>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <table className="w-full text-sm text-left">
                        <thead className="text-gray-500 border-b">
                            <th className="py-2">번호</th>
                            <th className="py-2">사용자</th>
                            <th className="py-2">물품</th>
                            <th className="py-2">대여일자</th>
                            <th className="py-2">상태</th>
                            <th className="py-2">관리</th>
                        </thead>
                        <tbody>
                            {dummyData.map(({ id, user, item, date, status }) => (
                                <tr key={id} className="border-b hover:bg-gray-50">
                                    <td className="py-2">{id}</td>
                                    <td className="py-2">{user}</td>
                                    <td className="py-2">{item}</td>
                                    <td className="py-2">{date}</td>
                                    <td className="py-2"><Tag status={status as any} /></td>
                                    <td className="py-2">
                                        <button className="text-blue-500 text-xs hover:underline">자세히</button>
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

export default RentalPage;