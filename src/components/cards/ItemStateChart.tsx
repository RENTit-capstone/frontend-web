import React from "react";

const ItemStateChart = () => {
  return (
    <div className="bg-white p-4 rounded shadow h-full">
      <h2 className="text-lg font-semibold mb-2">물품 상태별 분포</h2>
      <ul className="space-y-2 text-sm text-gray-700">
        <li className="flex justify-between">
          <span>대여 가능</span>
          <span className="font-semibold text-green-600">42개</span>
        </li>
        <li className="flex justify-between">
          <span>대여 중</span>
          <span className="font-semibold text-blue-600">15개</span>
        </li>
        <li className="flex justify-between">
          <span>점검 중</span>
          <span className="font-semibold text-yellow-600">3개</span>
        </li>
        <li className="flex justify-between">
          <span>고장</span>
          <span className="font-semibold text-red-600">1개</span>
        </li>
      </ul>
    </div>
  );
};

export default ItemStateChart;