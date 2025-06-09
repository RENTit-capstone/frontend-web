import { useEffect, useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import { getData } from "../../api/requests";

interface Device {
    deviceId: number;
    university: string;
    locationDescription: string;
}

const DevicePage = () => {
    const [devices, setDevices] = useState<Device[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDevices = async () => {
            setLoading(true);
            try {
                const res = await getData("/api/v1/admin/devices");
                setDevices(res.data || []);
            } catch (err) {
                console.error("기기 목록 조회 실패:", err);
                setError("기기 정보를 불러오는 데 실패했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchDevices();
    }, []);

    return (
        <div className="flex min-h-screen bg-gray-50 text-black">
            <Sidebar />
            <main className="flex-1 p-6">
                <h1 className="text-2xl font-bold mb-6">사물함 기기 관리</h1>

                <div className="bg-white p-4 rounded shadow">
                    {loading ? (
                        <p className="text-sm text-gray-500">로딩 중...</p>
                    ) : error ? (
                        <p className="text-sm text-red-500">{error}</p>
                    ) : devices.length === 0 ? (
                        <p className="text-sm text-gray-500">등록된 기기가 없습니다.</p>
                    ) : (
                        <table className="w-full text-sm text-left">
                            <thead className="text-gray-500 border-b">
                                <tr>
                                    <th className="py-2 px-2">기기 ID</th>
                                    <th className="py-2 px-2">대학교</th>
                                    <th className="py-2 px-2">설치 위치</th>
                                </tr>
                            </thead>
                            <tbody>
                                {devices.map((device) => (
                                    <tr key={device.deviceId} className="border-b hover:bg-gray-50">
                                        <td className="py-2 px-2">{device.deviceId}</td>
                                        <td className="py-2 px-2">{device.university}</td>
                                        <td className="py-2 px-2">{device.locationDescription}</td>
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

export default DevicePage;
