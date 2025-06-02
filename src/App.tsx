import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import SignUp from './pages/login/SignUp';
import Dashboard from './pages/dashboard/Dashboard';
import UserPage from './pages/users/UserPage';
import RentalPage from './pages/rental/RentalPage';
import ItemPage from './pages/items/ItemPage';
import InquiryPage from './pages/inquiries/InquiryPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/stats" element={<UserPage />} />
        <Route path="/rental" element={<RentalPage />} />
        <Route path="/items" element={<ItemPage />} />
        <Route path="/inquiry" element={<InquiryPage />} />
      </Routes>
    </Router>
  )
}

export default App
