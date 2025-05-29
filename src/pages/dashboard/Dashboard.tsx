import React from "react";
import Sidebar from '../../components/layout/Sidebar';
import ChartCard from "../../components/cards/ChartCard";
import RentalTableCard from "../../components/cards/RentalTableCard";

const Dashboard = () => {
    return (
        <div className="flex min-h-screen bg-gray-50 text-black">
            <Sidebar />

            <main className="flex-1 p-6">
                <h1 className="text-2xl font-bold mb-6">RENTit 관리자 대시보드</h1>
                {/* 메인 그리드 */}
                <div className="grid grid-cols-3 gap-6 mb-6">
                    <div className="col-span-3 bg-white p-4 rounded shadow">
                        [사용자 대여 건수 통계]
                        <ChartCard />
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-2">
                        [대여 관리 테이블]
                        <RentalTableCard />
                    </div>
                    <div className="col-span-1 bg-white p-4 rounded shadow">
                        [문의 조회 테이블]
                        <ChartCard />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;