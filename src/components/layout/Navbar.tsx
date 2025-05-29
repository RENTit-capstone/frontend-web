import React from "react";
import { Link, useLocation } from 'react-router-dom';
//import { Bell } from 'lucide-react';

const menuItems = [
    { name: '홈', path: '/' },
    { name: '대여관리', path: '/rental' },
    { name: '물품관리', path: '/items' },
    { name: '문의', path: '/inquiry' },
    { name: '피드백', path: '/feedback' },
    { name: '사용자 통계', path: '/stats' },
];

const Navbar = () => {
    const location = useLocation();

    return (
        <nav className="bg-[#344a5f] text-white px-8 py-4 flex justify-between items-center">
            {/* 좌측 로고 */}
            <div className="text-2xl font-bold">RENTit</div>

            {/* 중앙 메뉴 */}
            <div className="flex gap-6">
                {menuItems.map(({ name, path }) => (
                    <Link
                        key={path}
                        to={path}
                        className={`hover:text-blue-200 ${
                            location.pathname === path ? 'border-b-2 border-white' : ''
                        }`}
                    >
                        {name}
                    </Link>
                ))}
            </div>
            {/* 우측 알림 + 로그아웃 */}
            <div className="flex items-center gap-4">
                <button className="bg-white text-[#344a5f] px-3 py-1 rounded-md text-sm font-medium hover:bg-gray-100">
                    로그아웃
                </button>
            </div>
        </nav>
    );
}

export default Navbar;