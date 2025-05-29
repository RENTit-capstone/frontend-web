import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignUp from './pages/login/SignUp';
import Dashboard from './pages/dashboard/Dashboard';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  )
}

export default App
