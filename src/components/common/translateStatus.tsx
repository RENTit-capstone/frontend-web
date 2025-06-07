import type { StatusTag } from './Tag'; // Tag.tsx와 동일 경로 기준

export const translateStatus = (status: string): StatusTag => {
    switch (status) {
        case 'REQUESTED':
            return '대여신청';
        case 'APPROVED':
            return '대여신청 승낙됨';
        case 'LEFT_IN_LOCKER':
            return '사물함에서 대여 대기중';
        case 'PICKED_UP':
            return '대여중';
        case 'RETURNED_TO_LOCKER':
            return '사물함에서 반납 대기중';
        case 'COMPLETED':
            return '완료됨';
        case 'DELAYED':
            return '연체';
        case 'REJECTED':
            return '대여 거절됨';
        case 'CANCELLED':
            return '대여 취소됨';
        default:
            return '대여가능';
    }
};
