import { useEffect, useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import { useParams } from "react-router-dom";
import { getData } from "../../api/requests";
import dayjs from "dayjs";

interface Device {
    deviceId: number;
    university: string;
    locationDescription: string;
}

interface Locker {
    deviceId: number;
    lockerId: number;
    available: boolean;
    activatedAt: string | null;
    device: Device;
}

const DeviceDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const [lockers, setLockers] = useState<Locker[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLockers = async () => {
            if (!id) {
                setError("유효하지 않은 기기 ID입니다.");
                setLoading(false);
                return;
            }

            try {
                const res = await getData(`/api/v1/admin/lockers?deviceId=${id}`);
                setLockers(res.data);
            } catch (err) {
                console.error(`키오스크(ID:${id})의 사물함 정보 조회 실패`, err);
                setError("사물함 정보를 불러오는 데 실패했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchLockers();
    }, [id]);

    const deviceInfo = lockers.length > 0 ? lockers[0].device : null;

    return (
        <div className="flex min-h-screen bg-gray-50 text-black">
            <Sidebar />
            <main className="flex-1 p-6">
                <h1 className="text-2xl font-bold mb-6">사물함 관리</h1>

                <div className="bg-white p-4 rounded shadow space-y-4">
                    {loading ? (
                        <p className="text-sm text-gray-500">로딩 중...</p>
                    ) : error ? (
                        <p className="text-sm text-red-500">{error}</p>
                    ) : lockers.length === 0 ? (
                        <p className="text-sm text-gray-500">사물함 정보가 없습니다.</p>
                    ) : (
                        <>
                            {deviceInfo && (
                            <div className="mb-4">
                                <p className="text-sm text-gray-700">
                                    <strong>기기 위치:</strong> {deviceInfo.university} / {deviceInfo.locationDescription}
                                </p>
                            </div>
                            )}

                            <table className="w-full text-sm text-left border">
                                <thead className="bg-gray-100 text-gray-600">
                                    <tr>
                                        <th className="py-2 px-4">사물함 ID</th>
                                        <th className="py-2 px-4">활성화 여부</th>
                                        <th className="py-2 px-4">활성화 일시</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {lockers.map((locker) => (
                                        <tr key={locker.lockerId} className="border-t">
                                            <td className="py-2 px-4">{locker.lockerId}</td>
                                            <td className="py-2 px-4">
                                                {locker.available ? (
                                                    <span className="text-green-600 font-semibold">사용 가능</span>
                                                ) : (
                                                    <span className="text-red-500 font-semibold">사용 중</span>
                                                )}
                                            </td>
                                            <td className="py-2 px-4">
                                                {locker.activatedAt
                                                    ? dayjs(locker.activatedAt).format("YYYY-MM-DD HH:mm")
                                                    : "-"}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    )}
                </div>
            </main>
        </div>
    );
};

export default DeviceDetailPage;
