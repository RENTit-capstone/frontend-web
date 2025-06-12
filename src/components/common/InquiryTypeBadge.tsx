const InquiryTypeBadge = ({ type }: { type: string }) => {
    const typeMap: Record<string, { label: string; color: string }> = {
        SERVICE: { label: '서비스 문의', color: 'bg-blue-100 text-blue-800'},
        REPORT: { label: '신고/제보', color: 'bg-yellow-100 text-yellow-800'},
        DAMAGE: { label: '파손 신고', color: 'bg-red-100 text-red-800'},
    };

    const typeInfo = typeMap[type] || { label: '기타', color: 'bg-gray-100 text-gray-800'};

    return (
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${typeInfo.color}`}>
            {typeInfo.label}
        </span>
    );
};

export default InquiryTypeBadge;