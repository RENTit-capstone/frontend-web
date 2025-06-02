import Sidebar from "../../components/layout/Sidebar";

const dummyUsers = [
    { id: 1, name: '김지환', email: 'jihwan@example.com', role: '학생', status: '활성' },
    { id: 2, name: '이영희', email: 'yhlee@example.com', role: '학생회', status: '비활성' },
    { id: 3, name: '박지후', email: 'jhpark@example.com', role: '외부업체', status: '활성' },
];

const UserPage = () => {
    return (
        <div className="flex min-h-screen bg-gray-50 text-black">
            <Sidebar />
            <main className="flex-1 p-6">
                <h1 className="text-2xl font-bold mb-6">사용자 관리</h1>
                
                <div className="bg-white p-4 rounded shadow">
                    <table className="w-full text-sm text-left">
                        <thead className="text-gray-500 border-b">
                            <tr>
                                <th className="py-2">번호</th>
                                <th className="py-2">이름</th>
                                <th className="py-2">이메일</th>
                                <th className="py-2">등급</th>
                                <th className="py-2">상태</th>
                                <th className="py-2">관리</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dummyUsers.map(({ id, name, email, role, status }) => (
                                <tr key={id} className="border-b hover:bg-gray-50">
                                    <td className="py-2">{id}</td>
                                    <td className="py-2">{name}</td>
                                    <td className="py-2">{email}</td>
                                    <td className="py-2">
                                        {/* Role 수정 Placeholder */}
                                        <select className="border border-gray-300 rounded px-2 py-1 text-xs">
                                            <option>학생</option>
                                            <option>학생회</option>
                                            <option>외부업체</option>
                                        </select>
                                    </td>
                                    <td className="py-2">
                                        {/* Status 수정 Placeholder */}
                                        <select className="border border-gray-300 rounded px-2 py-1 text-xs">
                                            <option>활성</option>
                                            <option>비활성</option>
                                        </select>
                                    </td>
                                    <td className="py-2">
                                        <button className="text-blue-500 text-xs hover:underline">
                                            저장
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

export default UserPage;