import React from "react";
import Navbar from '../../components/layout/Navbar';

const Dashboard = () => {
    return (
        <div className="p-6 bg-gray-50 min-h-screen text-black">
            <Navbar />
            <main className="p-6">
            <h1 className="text-2xl font-bold mb-6">RENTit 관리자 대시보드</h1>
            {/* 메인 그리드 */}
                <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 bg-white p-4 rounded shadow">[UserCard + 상태 카드]</div>
                    <div className="col-span-2 bg-white p-4 rounded shadow">[통계 차트]</div>
                    <div className="col-span-1 bg-white p-4 rounded shadow">[피드백 테이블]</div>
                    <div className="col-span-2 bg-white p-4 rounded shadow">[대여 관리 테이블]</div>
                    <div className="col-span-1 bg-white p-4 rounded shadow">[게시 물품 테이블]</div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;