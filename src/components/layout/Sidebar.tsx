import { Link, useLocation } from 'react-router-dom';
import {
    Home,
    ClipboardList,
    Box,
    MessageSquare,
    BarChart2,
    RefreshCw,
    ExternalLink,
    Server
} from 'lucide-react';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import logoSrc from '../../assets/RENTit_logo.svg';

const getMonitoringUrl = () => window.__ENV__?.VITE_MONITORING_URL;

const menuItems = [
    { label: '홈', icon: <Home size={18} />, path: '/' },
    { label: '대여관리', icon: <ClipboardList size={18} />, path: '/rental' },
    { label: '물품관리', icon: <Box size={18} />, path: '/items' },
    { label: '문의', icon: <MessageSquare size={18} />, path: '/inquiry' },
    { label: '사용자 통계', icon: <BarChart2 size={18} />, path: '/user' },
    { label: '키오스크 관리', icon: <Server size={18} />, path: '/device' },
];

const Sidebar = () => {
    const location = useLocation();
    const [lastUpdated, setLastUpdated] = useState<string | null>(null);

    const handleRefresh = () => {
        window.location.reload();
    }

    useEffect(() => {
        const now = dayjs().format('YYYY-MM-DD HH:mm:ss');
        setLastUpdated(now);
    }, []);

    return (
        <aside className="w-60 min-h-screen bg-white shadow-md p-6 flex flex-col justify-between">
            <div>
                <img src={logoSrc} alt="RENTit Logo" className="h-8 w-auto mb-8" />

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
            </div>

            <div className="pt-6 border-t mt-6 text-sm space-y-3">
                <div className="space-y-2">
                    <a
                        href={getMonitoringUrl()}
                        className={`flex items-center gap-2 hover:underline`}
                    >
                        서버 모니터링
                        <ExternalLink size={14} />
                    </a>
                </div>

                <div className="mt-4">
                    <button
                        onClick={handleRefresh}
                        className="flex itmes-center gap-2 text-blue-600 hover:underline"
                    >
                        <RefreshCw size={14} />
                        데이터 새로 고침
                    </button>
                    {lastUpdated && (
                        <p className="text-xs text-gray-500 mt-1">
                            마지막 갱신: {lastUpdated}
                        </p>
                    )}
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;