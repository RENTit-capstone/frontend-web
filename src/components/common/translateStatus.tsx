import type { StatusTag } from './Tag'; // Tag.tsx와 동일 경로 기준

export const translateStatus = (status: string): StatusTag => {
    switch (status) {
        case 'REQUESTED':
            return '대여신청';
        case 'APPROVED':
        case 'LEFT_IN_LOCKER':
        case 'PICKED_UP':
            return '대여중';
        case 'RETURNED_TO_LOCKER':
        case 'COMPLETED':
            return '반납중';
        case 'DELAYED':
            return '연체';
        case 'REJECTED':
            return '거절됨';
        case 'CANCELLED':
            return '취소됨';
        default:
            return '대여가능';
    }
};
