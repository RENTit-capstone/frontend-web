const StatusBadge = ({ processed }: { processed: boolean }) => {
    return (
        <span
            className={`px-2 py-1 text-xs font-semibold rounded-full
            ${processed ? `bg-green-100 text-green-800` : `bg-red-100 text-red-800`}`}
        >
            {processed ? '처리됨' : '미처리'}
        </span>
    )
}

export default StatusBadge;