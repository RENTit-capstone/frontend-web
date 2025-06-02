import Sidebar from "../../components/layout/Sidebar";
import Tag from "../../components/common/Tag";

const dummyItems = [
    { id: 1, name: '노트북', category: '전자기기', status: '대여가능' },
    { id: 2, name: '빔프로젝터', category: '전자기기', status: '대여중' },
    { id: 3, name: '마이크', category: '음향기기', status: '연체' },
];

const ItemPage = () => {
    return (
        <div className="flex min-h-screen bg-gray-50 text-black">
            <Sidebar />
            <main className="flex-1 p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold mb-6">물품 관리</h1>
                    <button className="text-sm text-blue-500">
                        + 물품 등록
                    </button>
                </div>

                {/* 필터 영역 (placeholder)*/}
                <div className="flex gap-4 mb-4">
                    <input 
                        type="text"
                        placeholder="검색어 입력"
                        className="px-3 py-2 border-gray-300 rounded text-sm w-60"
                    />
                    <select className="px-3 py-2 border border-gray-300 rounded text-sm">
                        <option>전체 상태</option>
                        <option>대여가능</option>
                        <option>대여중</option>
                        <option>연체</option>
                    </select>
                </div>

                {/* 테이블 */}
                <div className="bg-white p-4 rounded shadow">
                    <table className="w-full text-sm text-left">
                        <thead className="text-gray-500 border-b">
                            <tr>
                                <th className="py-2">번호</th>
                                <th className="py-2">물품명</th>
                                <th className="py-2">카테고리</th>
                                <th className="py-2">상태</th>
                                <th className="py-2">관리</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dummyItems.map(({ id, name, category, status }) => (
                                <tr key={id} className="border-b hover:bg-gray-50">
                                    <td className="py-2">{id}</td>
                                    <td className="py-2">{name}</td>
                                    <td className="py-2">{category}</td>
                                    <td className="py-2">
                                        <Tag status={status as any} />
                                    </td>
                                    <td className="py-2">
                                        <button className="text-blue-500 text-xs hover:underline">수정</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

export default ItemPage;