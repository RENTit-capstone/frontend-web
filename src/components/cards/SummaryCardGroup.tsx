import { useEffect, useState } from "react";
import SummaryStatCard from "./SummaryStatCard";
import { getData } from "../../api/requests";
import dayjs from "dayjs";

const SummaryCardGroup = () => {
    const [todayRentals, setTodayRentals] = useState<number>(0);
    const [delayedCount, setDelayedCount] = useState<number>(0);
    const [unprocessedInquiries, setUnprocessedInquiries] = useState<number>(0);
    const [weeklyPaymentSum, setWeeklyPaymentSum] = useState<number>(0);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const todayStr = dayjs().format("YYYY-MM-DD");
                const rentalRes = await getData(`/api/v1/admin/rentals?sort=requestDate,desc&page=0&size=100`);
                const todayCount = rentalRes.data.content.filter((rental: any) =>
                rental.requestDate.startsWith(todayStr)
            ).length;
            setTodayRentals(todayCount);

            const delayedRes = await getData(`/api/vi/admin/rentals?statuses=DELAYED`);
            setDelayedCount(delayedRes.data.content.length);

            const inquiryRes = await getData(`/api/v1/admin/inquiries?processed=false&page=0&size=100`);
            setUnprocessedInquiries(inquiryRes.data.content.length);

            const paymentRes = await getData(`/api/v1/admin/payments?type=RENTAL_FEE`);
            const startOfWeek = dayjs().startOf("week");
            const endOfWeek = dayjs().endOf("week");
            const weeklySum = paymentRes.data
                .filter((payment: any) =>
                    dayjs(payment.createdAt).isAfter(startOfWeek) &&
                    dayjs(payment.createdAt).isBefore(endOfWeek)
                )
                .reduce((sum: number, p: any) => sum + p.amount, 0);
            setWeeklyPaymentSum(weeklySum);
            } catch (err) {
                console.error("동계 데이터를 불러오는 중 오류 발생:", err);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="grid grid-cols-4 gap-4 mb-6">
            <SummaryStatCard title="오늘 대여" value={`${todayRentals}건`} color="blue" />
            <SummaryStatCard title="연체" value={`${delayedCount}건`} color="red" />
            <SummaryStatCard title="미처리 문의" value={`${unprocessedInquiries}건`} color="gray" />
            <SummaryStatCard title="이번 주 결제" value={`${weeklyPaymentSum.toLocaleString()}원`} color="green" />
        </div>
    );
};

export default SummaryCardGroup;