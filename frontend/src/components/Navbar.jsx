import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/Authcontext';
import { Code2, LogOut, User, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/'); };

  const links = [
    { to: '/algorithms', label: 'Algorithms' },
    { to: '/data-structures', label: 'Data Structures' },
    { to: '/templates', label: 'Templates' },
    { to: '/complexity', label: 'Complexity' },
    { to: '/problems', label: 'Problems' },
  ];

  return (
    <nav className="navbar">
      <div className="container nav-inner">
        <Link to="/" className="nav-brand">
          <div className="brand-icon"><Code2 size={18} /></div>
          <span>CP Toolkit</span>
        </Link>

        <button className="nav-toggle" onClick={() => setOpen(!open)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>

        <ul className={`nav-links ${open ? 'open' : ''}`}>
          {links.map(l => (
            <li key={l.to}>
              <Link to={l.to} className="nav-link" onClick={() => setOpen(false)}>{l.label}</Link>
            </li>
          ))}
          {user ? (
            <>
              <li><Link to="/dashboard" className="nav-link" onClick={() => setOpen(false)}><User size={15} /> {user.username}</Link></li>
              <li><button className="btn btn-outline btn-sm" onClick={handleLogout}><LogOut size={15} /> Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login" className="btn btn-outline btn-sm" onClick={() => setOpen(false)}>Login</Link></li>
              <li><Link to="/register" className="btn btn-primary btn-sm" onClick={() => setOpen(false)}>Sign Up</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}