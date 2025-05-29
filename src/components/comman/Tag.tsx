import React from 'react';

interface TagProps {
    status: '대여가능' | '대여중' | '연체' | '반납중' | '대여신청';
}

const statusColors: Record<TagProps['status'], string> = {
    대여가능: 'bg-green-100 text-green-800',
    대여중: 'bg-orange-100 text-orange-800',
    반납중: 'bg-purple-100 text-purple-800',
    연체: 'bg-red-100 text-red-800',
    대여신청: 'bg-blue-100 text-blue-800',
};

const Tag: React.FC<TagProps> = ({ status }) => {
    return (
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[status]}`}>
            {status}
        </span>
    );
};

export default Tag;