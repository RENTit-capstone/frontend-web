import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import SignUp from './pages/login/SignUp';
import LoginPage from './pages/login/LoginPage';
import Dashboard from './pages/dashboard/Dashboard';
import UserPage from './pages/users/UserPage';
import RentalPage from './pages/rental/RentalPage';
import ItemPage from './pages/items/ItemPage';
import InquiryPage from './pages/inquiries/InquiryPage';
import useAuthStore from './stores/useAuthStore';
import { JSX, useEffect, useState } from 'react';
import InquiryDetailPage from './pages/inquiries/InquiryDetailPage';
import RentalDetailPage from './pages/rental/RentalDetailPage';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { accessToken } = useAuthStore();
    return accessToken ? children : <Navigate to="/login" replace />;
};

function App() {
    const { accessToken, restoreTokens } = useAuthStore();
    const [isRestored, setIsRestored] = useState(false);

    useEffect(() => {
        restoreTokens();
        setIsRestored(true);
    }, [restoreTokens]);

    if (!isRestored) return null;

    return (
        <Router>
            <Routes>
                <Route path="/" element={
                    accessToken ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />
                } />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUp />} />

                {/* 보호된 라우트 */}
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/stats" element={<ProtectedRoute><UserPage /></ProtectedRoute>} />
                <Route path="/rental" element={<ProtectedRoute><RentalPage /></ProtectedRoute>} />
                <Route path="/items" element={<ProtectedRoute><ItemPage /></ProtectedRoute>} />
                <Route path="/inquiry" element={<ProtectedRoute><InquiryPage /></ProtectedRoute>} />
                <Route path="/inquiry/:id" element={<ProtectedRoute><InquiryDetailPage /></ProtectedRoute>} />
                <Route path="/rental/:id" element={<ProtectedRoute><RentalDetailPage /></ProtectedRoute>} />
            </Routes>
        </Router>
    )
}

export default App
