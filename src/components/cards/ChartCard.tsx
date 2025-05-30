import React from 'react';

const ChartCard = () => {
    return (
        <div className="bg-white p-4 rounded shadow h-full">
            <h2 className="text-lg font-semibold mb-2">대여 상태별 통계</h2>
            {/* 여기에 차트 라이브러리 추가 예정 or 이미지로 대체 */}
            <div className="h-48 flex items-center justify-center text-gray-400 text-sm">
                (그래프 자리 - 예: 신청/대여중/반납중/연체)
            </div>
        </div>
    );
};

export default ChartCard;