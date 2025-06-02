import React from "react";
import Sidebar from "../../components/layout/Sidebar";

const RentalPage = () => {
    return (
        <div className="flex min-h-screen bg-gray-50 text-black">
            <Sidebar />
            <main className="flex-1 p-6">
                <h1 className="text-2xl font-bold mb-6">대여 관리</h1>
                <div className="bg-white p-4 rounded shadow">[대여 목록 테이블]</div>
            </main>
        </div>
    );
};

export default RentalPage;