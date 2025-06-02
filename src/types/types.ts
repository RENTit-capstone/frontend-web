export type SignUpType = {
    name: string;
    nickname: string;
    email: string;
    emailConfirm: string;
    pwd: string;
    pwdConfirm: string;
    phone: string;
    university: string;
    major: string;
    stdId: string;
    grade: string;
}

export type RentalStatus = '대여가능' | '대여중' | '연체' | '반납중' | '대여신청';
