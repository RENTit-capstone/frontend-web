import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import { deleteData, getData } from "../../api/requests";
import dayjs from "dayjs";
import Tag from "../../components/common/Tag";
import defaultProfileImg from "../../assets/default_user_profile.png"
import { translateStatus } from "../../components/common/translateStatus";

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

interface Rental {
    rentalId: number;
    itemName: string;
    status: string;
    requestDate: string;
    owner: boolean;
    renterName: string;
    ownerName: string;
}

interface Inquiry {
    inquiryId: number;
    title: string;
    type: string;
    processed: boolean;
    createdAt: string;
    memberId: number;
}

const MemberDetailPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const member = location.state as Member;

    const [borrowedRentals, setBorrowedRentals] = useState<Rental[]>([]);
    const [ownedRentals, setOwnedRentals] = useState<Rental[]>([]);
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);

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

    useEffect(() => {
        const fetchExtraInfo = async () => {
            try {
                const rentalRes = await getData(`/api/v1/admin/rentals/${member.memberId}`);
                const rentalData: Rental[] = rentalRes.data;

                const borrowed = rentalData.filter(r => r.renterName === member.nickname);
                const owned = rentalData.filter(r => r.ownerName === member.nickname);

                setBorrowedRentals(borrowed);
                setOwnedRentals(owned);

                const inquiryRes = await getData(`/api/v1/admin/inquiries`);
                const myInquiries = inquiryRes.data.content.filter((q: Inquiry) => q.memberId === member.memberId);
                setInquiries(myInquiries);
            } catch (err) {
                console.error("유저 관련 정보 불러오기 실패:", err);
            }
        };

        fetchExtraInfo();
    }, [member]);


    return (
        <div className="flex min-h-screen bg-gray-50 text-black">
            <Sidebar />
            <main className="flex-1 p-6">
                <h1 className="text-2xl font-bold mb-6">회원 상세 정보</h1>
                <div className="bg-white p-4 rounded shadow space-y-3">
                    <div className="flex gap-4 items-center">
                        <img
                            src={member.profileImg || defaultProfileImg}
                            alt="profile"
                            className="w-20 h-20 rounded-full border object-cover"
                        />
                        <div>
                            <p><strong>{member.nickname}</strong> ({member.name})</p>
                            <p className="text-sm text-gray-500">{member.email}</p>
                            <p className="text-sm">{member.university} / {member.studentId}</p>
                            <p className="text-sm">성별: {member.gender}</p>
                            <p className="text-sm">연락처: {member.phone}</p>
                        </div>
                    </div>

                    <div className="flex gap-4 mt-4">
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                            회원 삭제
                        </button>
                    </div>
                </div>

                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-2">대여 기록 (내가 빌린 물품)</h2>
                    {borrowedRentals.length === 0 ? (
                        <p className="text-sm text-gray-500">대여 기록 없음</p>
                    ) : (
                        <ul className="text-sm space-y-1">
                            {borrowedRentals.map((r) => (
                                <li
                                    key={r.rentalId}
                                    className="cursor-pointer hover:underline"
                                    onClick={() => navigate(`/rental/${r.rentalId}`)}
                                >
                                    [{dayjs(r.requestDate).format("YYYY-MM-DD")}] {r.itemName} - <Tag status={translateStatus(r.status)} />
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-2">내 물품의 대여 기록</h2>
                    {ownedRentals.length === 0 ? (
                        <p className="text-sm text-gray-500">소유한 물품의 대여 기록 없음</p>
                    ) : (
                        <ul className="text-sm space-y-1">
                            {ownedRentals.map((r) => (
                                <li
                                    key={r.rentalId}
                                    className="cursor-pointer hover:underline"
                                    onClick={() => navigate(`/rental/${r.rentalId}`)}
                                >
                                    [{dayjs(r.requestDate).format("YYYY-MM-DD")}] {r.itemName} - <Tag status={translateStatus(r.status)} />
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-2">작성한 문의</h2>
                    {inquiries.length === 0 ? (
                        <p className="text-sm text-gray-500">작성한 문의 없음</p>
                    ) : (
                        <ul className="text-sm space-y-1">
                            {inquiries.map((q) => (
                                <li
                                    key={q.inquiryId}
                                    className="cursor-pointer hover:underline"
                                    onClick={() => navigate(`/inquiry/${q.inquiryId}`)}
                                >
                                    [{dayjs(q.createdAt).format("YYYY-MM-DD")}] {q.title} ({q.type}) {q.processed ? '✅' : '❌'}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </main>
        </div>
    );
};

export default MemberDetailPage;
