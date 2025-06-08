import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getData, putData } from "../../api/requests";
import dayjs from "dayjs";
import Sidebar from "../../components/layout/Sidebar";
import StatusBadge from "../../components/common/InquiryStatusBadge";
import InquiryTypeBadge from "../../components/common/InquiryTypeBadge";
import defaultProfileImg from "../../assets/default_user_profile.png";

interface InquiryDetail {
    inquiryId: number;
    memberId: number;
    type: string;
    title: string;
    content: string;
    answer: string | null;
    images: string[] | null;
    processed: boolean;
    createdAt: string;
}

interface Member {
    memberId: number;
    email: string;
    name: string;
    role: string;
    profileImg: string;
    createdAt: string;
    locked: boolean;
    nickname: string;
    gender: string;
    studentId: string;
    university: string;
}

const InquiryDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [detail, setDetail] = useState<InquiryDetail | null>(null);
    const [memberInfo, setMemberInfo] = useState<Member | null>(null);
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchMember = async (memberId: number) => {
        try {
            const res = await getData(`/api/v1/admin/members`);
            const found = res.data.find((member: Member) => member.memberId === memberId);

            if (found) {
                setMemberInfo(found);
            } else {
                setMemberInfo({
                    memberId,
                    email: "존재하지 않음",
                    name: "UNKNOWN",
                    role: "UNKNOWN",
                    profileImg: "",
                    createdAt: "",
                    locked: true,
                    nickname: "존재하지 않음",
                    gender: "-",
                    studentId: "-",
                    university: "존재하지 않음"
                });
            }
        } catch (err) {
            console.error(`작성자 정보(ID:${memberId}) 조회 실패`, err);
            setMemberInfo({
                memberId,
                email: "존재하지 않음",
                name: "UNKNOWN",
                role: "UNKNOWN",
                profileImg: "",
                createdAt: "",
                locked: true,
                nickname: "존재하지 않음",
                gender: "-",
                studentId: "-",
                university: "존재하지 않음"
            });
        }
    };

    const handleSubmit = async () => {
        try {
            await putData(`/api/v1/admin/inquiries/${id}/answer`, { answer });
            await putData(`/api/v1/admin/inquiries/${id}/processed`);
            alert("답변이 등록되고 문의가 처리됨 상태로 변경되었습니다.");
            navigate("/inquiry");
        } catch (err) {
            alert("답변 등록에 실패했습니다.");
            console.error(err);
        }
    };

    useEffect(() => {
        const fetchDetail = async () => {
            setLoading(true);
            try {
                const data = await getData(`/api/v1/admin/inquiries/${id}`);
                setDetail(data.data);
                setAnswer(data.data.answer || "");
            } catch (err) {
                alert("문의 정보를 불러오지 못했습니다.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchDetail();
    }, [id]);

    useEffect(() => {
        if (detail?.memberId) {
            fetchMember(detail.memberId);
        }
    }, [detail?.memberId]);

    if (loading || !detail) return <div>로딩 중...</div>

    return (
        <div className="flex min-h-screen bg-gray-50 text-black">
            <Sidebar />
            <main className="flex-1 p-6">
                <h1 className="text-2xl font-bold mb-4">문의 상세</h1>

                <div className="bg-white p-4 rounded shadow space-y-4">
                    <div>
                        <strong>제목:</strong> {detail.title}
                    </div>
                    <div>
                        <strong>문의 ID:</strong> {detail.inquiryId}
                    </div>
                    <div>
                        <strong>유형:</strong>
                        <InquiryTypeBadge type={detail.type} />
                    </div>
                    <div>
                        <strong>처리 상태:</strong>
                        <StatusBadge processed={detail.processed}/>
                    </div>
                    {!memberInfo ? (
                        <p className="text-sm text-gray-400">작성자 정보 불러오는 중...</p>
                    ) : memberInfo.name === "UNKNOWN" ? (
                        <p className="text-sm text-red-500">존재하지 않는 사용자입니다.</p>
                    ) : (
                        <div className="border p-4 rounded bg-gray-50 text-sm">
                            <h3 className="font-semibold mb-2">작성자 정보</h3>
                            <div>
                                <img
                                    src={memberInfo.profileImg?.trim() ? memberInfo.profileImg : defaultProfileImg}
                                    alt="profile"
                                    className="w-14 h-14 rounded-full border object-cover"
                                />
                                <div>
                                    <p><strong>닉네임:</strong> {memberInfo.nickname}</p>
                                    <p><strong>학번:</strong> {memberInfo.studentId}</p>
                                    <p><strong>대학:</strong> {memberInfo.university}</p>
                                    <p className="text-gray-500 text-xs">{memberInfo.email}</p>
                                </div>
                            </div>
                        </div>
                    )}
                    <div>
                        <strong>내용:</strong>
                        <p className="whitespace-pre-wrap">{detail.content}</p>
                    </div>
                    {detail.images && detail.images.length > 0 && (
                        <div>
                            <strong>이미지:</strong>
                            <div className="flex gap-2 mt-2">
                                {detail.images.map((url, idx) => (
                                    <img key={idx} src={url} alt="첨부" className="w-32 h-32 object-cover border" />
                                ))}
                            </div>
                        </div>
                    )}
                    <div>
                        <strong>작성일자:</strong> {dayjs(detail.createdAt).format("YYYY-MM-DD HH:mm")}
                    </div>
                    <div>
                        <strong>답변:</strong>
                        <textarea 
                            value={answer}
                            disabled={detail.processed}
                            onChange={(e) => setAnswer(e.target.value)}
                            rows={6}
                            className="w-full mt-1 p-2 border rounded"
                        />
                    </div>
                    <button
                        disabled={detail.processed}
                        onClick={handleSubmit}
                        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-300"
                    >
                        답변 등록 및 처리
                    </button>
                </div>
            </main>
        </div>
    )
}

export default InquiryDetailPage;