import { RentalStatus, RentalItem, Feedback } from '../../types/dashboard';

export const rentalStatusList: RentalStatus[] = [
    { type: '대여신청', count: 2},
    { type: '대여중', count: 2 },
    { type: '반납중', count: 3 },
    { type: '연체', count: 2 },
];

export const rentalItems: RentalItem[] = [
    { no: 41, item: '마우스', user: '렌트잇사용자1', date: '2025.01.01', status: '반납중' },
    { no: 40, item: '키보드', user: '렌트잇사용자2', date: '2025.01.01', status: '연체' },
    { no: 39, item: '의자', user: '렌트잇사용자3', date: '2025.01.01', status: '대여중' },
];

export const feedbacks: Feedback[] = [
  { no: 41, content: '마우스', writer: '사용자A', date: '2025.01.01' },
  { no: 40, content: '키보드', writer: '사용자B', date: '2025.01.01' },
]