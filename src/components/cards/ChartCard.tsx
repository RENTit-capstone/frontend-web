import React, { useState } from 'react';

const filters = ['기간(월)', '기간(일)', '나이'] as const;
type FilterType = typeof filters[number];

const ChartCard = () => {
    const [activeFilter, setActiveFilter] = useState<FilterType>('기간(월)');

    return (
        <div className="bg-white p-4 rounded shadow">
            {/* 필터 버튼 */}
            <div className="flex gap-2 mb-4">
                {filters.map((filter) => (
                    <button
                        key={filter}
                        className={`px-3 py-1 text-sm rounded border ${
                            activeFilter === filter
                            ? 'bg-blue-500 text-white border-blue-500'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                        }`}
                        onClick={() => setActiveFilter(filter)}
                    >
                        {filter}
                    </button>
                ))}
            </div>

            {/* 그래프 이미지 (임시) */}
            <div className="w-full h-48 bg-gray-100 rounded flex items-center justify-center text-gray-500 text-sm">
                {/* 실제로는 이미지 경로 넣을 수 있음 */}
                [막대그래프 이미지 paceholder]
            </div>
        </div>
    );
};

export default ChartCard;