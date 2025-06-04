export interface RentalInfo {
  rentalId: number;
  itemId: number;
  ownerId: number;
  renterId: number;
  requestDate: string;
  status: '대여신청' | '대여중' | '반납중' | '연체';
  startDate: string;
  dueDate: string;
}