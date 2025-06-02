export interface RentalStatus {
    type: '대여신청' | '대여중' | '반납중' | '연체';
    count: number;
}

export interface RentalItem {
    no: number;
    item: string;
    user: string;
    date: string;
    status: string;
}

export interface Feedback {
    no: number;
    content: string;
    writer: string;
    date: string;
}