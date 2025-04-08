import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignUp from './pages/login/Signup'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  )
}

export default App
