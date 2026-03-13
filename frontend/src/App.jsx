import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/Authcontext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/Protectedroute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Algorithms from './pages/Algorithms';
import DataStructures from './pages/DataStructures';
import Templates from './pages/Templates';
import Complexity from './pages/Complexity';
import Problems from './pages/Problems';
import Dashboard from './pages/Dashboard.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-right" toastOptions={{ style: { background: '#1a1a2e', color: '#e2e8f0', border: '1px solid #2d3748' } }} />
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/algorithms" element={<Algorithms />} />
            <Route path="/data-structures" element={<DataStructures />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/complexity" element={<Complexity />} />
            <Route path="/problems" element={<Problems />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          </Routes>
        </main>
      </AuthProvider>
    </BrowserRouter>
  );
}