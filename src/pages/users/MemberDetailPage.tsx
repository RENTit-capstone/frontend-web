import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import { putData, deleteData } from "../../api/requests";

interface Member {
    memberId: number;
    name: string;
    nickname: string;
    email: string;
    phone: string;
    university: string;
    studentId: string;
    gender: string;
    profileImg: string;
    memberType: string;
}

const MemberDetailPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const member = location.state as Member;

    const [form, setForm] = useState({
        name: member.name,
        nickname: member.nickname,
        phone: member.phone,
        memberType: member.memberType,
        imageKey: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdate = async () => {
        try {
            await putData("/api/v1/members", form);
            alert("회원 정보가 수정되었습니다.");
        } catch (err) {
            console.error("수정 실패:", err);
            alert("수정 실패");
        }
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
        if (!confirmDelete) return;
        try {
            await deleteData(`/api/v1/admin/members/${member.memberId}`);
            alert("회원이 삭제되었습니다.");
            navigate("/user");
        } catch (err) {
            console.error("삭제 실패:", err);
            alert("삭제 실패");
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50 text-black">
            <Sidebar />
            <main className="flex-1 p-6">
                <h1 className="text-2xl font-bold mb-6">회원 상세 정보</h1>
                <div className="bg-white p-4 rounded shadow space-y-3">
                    <div><strong>회원 ID:</strong> {member.memberId}</div>
                    <div><strong>이메일:</strong> {member.email}</div>
                    <div><strong>소속 대학:</strong> {member.university}</div>
                    <div><strong>학번:</strong> {member.studentId}</div>
                    <div><strong>성별:</strong> {member.gender}</div>

                    <div>
                        <label className="block text-sm font-medium">이름</label>
                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2 mt-1"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">닉네임</label>
                        <input
                            name="nickname"
                            value={form.nickname}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2 mt-1"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">전화번호</label>
                        <input
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2 mt-1"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">이미지 키 (선택)</label>
                        <input
                            name="imageKey"
                            value={form.imageKey}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2 mt-1"
                        />
                    </div>

                    <div className="flex gap-4 mt-4">
                        <button
                            onClick={handleUpdate}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            수정
                        </button>
                        <button
                            onClick={handleDelete}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                            삭제
                        </button>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default MemberDetailPage;