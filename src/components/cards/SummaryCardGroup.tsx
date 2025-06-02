import React from "react";
import SummaryStatCard from "./SummaryStatCard";

const SummaryCardGroup = () => {
    return (
        <div className="grid grid-cols-4 gap-4 mb-6">
            <SummaryStatCard title="오늘 대여" value="8건" color="blue" />
            <SummaryStatCard title="연체" value="3건" color="red" />
            <SummaryStatCard title="미처리 문의" value="2건" color="gray" />
            <SummaryStatCard title="이번 주 결제" value="15,000원" color="green" />
        </div>
    );
};

export default SummaryCardGroup;