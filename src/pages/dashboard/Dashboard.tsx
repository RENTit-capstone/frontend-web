import Sidebar from '../../components/layout/Sidebar';
import SummaryCardGroup from "../../components/cards/SummaryCardGroup";
import ChartCard from "../../components/cards/ChartCard";
import ItemStateChart from "../../components/cards/ItemStateChart";
import RentalTableCard from "../../components/cards/RentalTableCard";
import InquiryTableCard from "../../components/cards/InquiryTableCard";
import ItemTrendChart from '../../components/cards/ItemTrendChart';

const Dashboard = () => {
    return (
        <div className="flex min-h-screen bg-gray-50 text-black">
            <Sidebar />

            <main className="flex-1 p-6">
                <h1 className="text-2xl font-bold mb-6">RENTit 관리자 대시보드</h1>

                {/* 상단 요약 카드 영역 */}
                <SummaryCardGroup />

                {/* 중간 통계 영역 */}
                <div className="flex gap-4 mb-6">
                    <div className="w-1/2"><ChartCard /></div>
                    <div className="w-1/4"><ItemStateChart /></div>
                    <div className="w-1/4"><ItemTrendChart /></div>
                </div>

                {/* 하단 테이블 영역 */}
                <div className="grid grid-cols-2 gap-6">
                    <div className="col-span-1">
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