import { useEffect, useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import { getData } from "../../api/requests";
import { useNavigate } from "react-router-dom";

interface User {
    memberId: number;
    name: string;
    email: string;
    nickname: string;
    university: string;
    studentId: string;
    locked: boolean;
}

const UserPage = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await getData("/api/v1/admin/members");
            setUsers(res.data || []);
        } catch (err) {
            console.error("사용자 정보 불러오기 실패:", err);
            setError("사용자 정보를 불러오는 데 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="flex min-h-screen bg-gray-50 text-black">
            <Sidebar />
            <main className="flex-1 p-6">
                <h1 className="text-2xl font-bold mb-6">사용자 관리</h1>

                <div className="bg-white p-4 rounded shadow">
                    {loading ? (
                        <p className="text-sm text-gray-500">로딩 중...</p>
                    ) : error ? (
                        <p className="text-sm text-red-500">{error}</p>
                    ) : (
                        <table className="w-full text-sm text-left">
                            <thead className="text-gray-500 border-b">
                                <tr>
                                    <th className="py-2">번호</th>
                                    <th className="py-2">이름</th>
                                    <th className="py-2">닉네임</th>
                                    <th className="py-2">이메일</th>
                                    <th className="py-2">소속</th>
                                    <th className="py-2">학번</th>
                                    <th className="py-2">상태</th>
                                    <th className="py-2">관리</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.memberId} className="border-b hover:bg-gray-50">
                                        <td className="py-2">{user.memberId}</td>
                                        <td className="py-2">{user.name}</td>
                                        <td className="py-2">{user.nickname}</td>
                                        <td className="py-2">{user.email}</td>
                                        <td className="py-2">{user.university}</td>
                                        <td className="py-2">{user.studentId}</td>
                                        <td className="py-2">
                                            <select className="border border-gray-300 rounded px-2 py-1 text-xs">
                                                <option value="active" selected={!user.locked}>활성</option>
                                                <option value="inactive" selected={user.locked}>비활성</option>
                                            </select>
                                        </td>
                                        <td className="py-2">
                                            <button
                                                className="text-blue-500 text-xs hover:underline"
                                                onClick={() => navigate(`/user/${user.memberId}`, { state: user })}
                                            >
                                                수정
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

export default UserPage;
