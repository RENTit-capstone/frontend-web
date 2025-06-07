import React from 'react';

export type StatusTag = 
| '대여가능'
| '대여신청'
| '대여신청 승낙됨'
| '사물함에서 대여 대기중'
| '대여중'
| '사물함에서 반납 대기중'
| '완료됨'
| '연체'
| '대여 거절됨'
| '대여 취소됨';

interface TagProps {
    status: StatusTag;
}

const statusColors: Record<StatusTag, string> = {
    대여가능: 'bg-gray-100 text-gray-800',
    대여신청: 'bg-blue-100 text-blue-800',
    '대여신청 승낙됨': 'bg-green-100 text-green-800',
    '사물함에서 대여 대기중': 'bg-yellow-100 text-yellow-800',
    대여중: 'bg-orange-100 text-orange-800',
    '사물함에서 반납 대기중': 'bg-purple-100 text-purple-800',
    완료됨: 'bg-gray-100 text-gray-800',
    연체: 'bg-red-100 text-red-800',
    '대여 거절됨': 'bg-rose00 text-rose-800',
    '대여 취소됨': 'bg-pink-100 text-pink-800',
};

const Tag: React.FC<TagProps> = ({ status }) => {
    return (
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[status]}`}>
            {status}
        </span>
    );
};

export default Tag;