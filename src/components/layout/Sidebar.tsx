import { Link, useLocation } from 'react-router-dom';
import {
    Home,
    ClipboardList,
    Box,
    MessageSquare,
    BarChart2,
} from 'lucide-react';

const menuItems = [
    { label: '홈', icon: <Home size={18} />, path: '/' },
    { label: '대여관리', icon: <ClipboardList size={18} />, path: '/rental' },
    { label: '물품관리', icon: <Box size={18} />, path: '/items' },
    { label: '문의', icon: <MessageSquare size={18} />, path: '/inquiry' },
    { label: '사용자 통계', icon: <BarChart2 size={18} />, path: '/stats' },
];

const Sidebar = () => {
    const location = useLocation();

    return (
        <aside className="w-60 min-h-screen bg-white shadow-md p-6">
            <h2 className="text-x1 font-bold mb-8">RENTit</h2>

            <nav className="flex flex-col gap-3">
                {menuItems.map(({ label, icon, path }) => {
                    const isActive = location.pathname === path;

                    return (
                        <Link
                            key={path}
                            to={path}
                            className={`flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition ${
                                isActive
                                ? 'bg-blue-100 text-blue-700'
                                : 'text-gray-700 hover:bg-gray-100'
                            }`}
                        >
                            {icon}
                            <span>{label}</span>
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
};

export default Sidebar;