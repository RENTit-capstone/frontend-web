import React from "react";
import Sidebar from '../../components/layout/Sidebar';
import SummaryCardGroup from "../../components/cards/SummaryCardGroup";
import SummaryStatCard from "../../components/cards/SummaryStatCard";
import ChartCard from "../../components/cards/ChartCard";
import ItemStateChart from "../../components/cards/ItemStateChart";
import RentalTableCard from "../../components/cards/RentalTableCard";
import InquiryTableCard from "../../components/cards/InquiryTableCard";

const Dashboard = () => {
    return (
        <div className="flex min-h-screen bg-gray-50 text-black">
            <Sidebar />

            <main className="flex-1 p-6">
                <h1 className="text-2xl font-bold mb-6">RENTit 관리자 대시보드</h1>

                {/* 상단 요약 카드 영역 */}
                <SummaryCardGroup />

                {/* 중간 통계 영역 */}
                <div className="grid grid-cols-3 gap-6 mb-6">
                    <ChartCard />
                    <ItemStateChart />
                    {/* SummaryStatCard는 추후 그래프 도입 시 제거하기 */}
                    <div className="col-span-1">
                        <SummaryStatCard
                            title="일간/주간 대여량"
                            value="오늘 8건 / 이번 주 37건"
                            color="blue"
                        />
                    </div>
                </div>

                {/* 하단 테이블 영역 */}
                <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-2">
                        <RentalTableCard />
                    </div>
                    <div className="col-span-1">
                        <InquiryTableCard />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;