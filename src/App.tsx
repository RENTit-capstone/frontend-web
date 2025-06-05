import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import SignUp from './pages/login/SignUp';
import LoginPage from './pages/login/LoginPage';
import Dashboard from './pages/dashboard/Dashboard';
import UserPage from './pages/users/UserPage';
import RentalPage from './pages/rental/RentalPage';
import ItemPage from './pages/items/ItemPage';
import InquiryPage from './pages/inquiries/InquiryPage';
import useAuthStore from './stores/useAuthStore';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { accessToken } = useAuthStore();
  return accessToken ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />

        {/* 보호된 라우트 */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/stats" element={<UserPage />} />
        <Route path="/rental" element={<RentalPage />} />
        <Route path="/items" element={<ItemPage />} />
        <Route path="/inquiry" element={<InquiryPage />} />
      </Routes>
    </Router>
  )
}

export default App
