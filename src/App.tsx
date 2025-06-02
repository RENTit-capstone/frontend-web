import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import SignUp from './pages/login/SignUp';
import Dashboard from './pages/dashboard/Dashboard';

const Placeholder = ({ name }: { name: string }) => (
  <div className="p-10 text-x1 font-semibold text-gray-500">{name} 페이지는 준비 중입니다.</div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/rental" element={<Placeholder name="대여 관리" />} />
        <Route path="/items" element={<Placeholder name="물품 관리" />} />
        <Route path="/inquiry" element={<Placeholder name="문의" />} />
        <Route path="/stats" element={<Placeholder name="사용자 통계" />} />
      </Routes>
    </Router>
  )
}

export default App
