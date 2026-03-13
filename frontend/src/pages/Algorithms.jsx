import { useState, useEffect } from 'react';
import { useAuth } from '../context/Authcontext';
import api from '../api/axios';
import toast from 'react-hot-toast';
import { X, Bookmark, BookmarkCheck, Copy, Check } from 'lucide-react';

function CodeModal({ algo, onClose, bookmarked, onBookmark }) {
  const [lang, setLang] = useState('javascript');
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(algo.code[lang] || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        <div className="modal-header">
          <h3>{algo.name}</h3>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="copy-btn" onClick={onBookmark}>
              {bookmarked ? <BookmarkCheck size={16} color="#a89bff" /> : <Bookmark size={16} />}
            </button>
            <button className="modal-close" onClick={onClose}><X size={20} /></button>
          </div>
        </div>
        <div className="modal-body">
          <div className="meta-row">
            <span className={`badge badge-${algo.difficulty.toLowerCase()}`}>{algo.difficulty}</span>
            <span className="badge badge-purple">{algo.category}</span>
            <span className="badge badge-teal">{algo.complexity}</span>
            <span className="badge" style={{ background: 'rgba(255,107,107,0.1)', color: '#f87171' }}>Space: {algo.spaceComplexity}</span>
          </div>
          <p className="modal-desc">{algo.description}</p>
          <div className="tab-bar" style={{ marginBottom: '1rem' }}>
            {['javascript', 'cpp', 'python'].map(l => (
              <button key={l} className={`tab-btn ${lang === l ? 'active' : ''}`} onClick={() => setLang(l)}>
                {l === 'cpp' ? 'C++' : l === 'python' ? 'Python' : 'JavaScript'}
              </button>
            ))}
          </div>
          <div className="code-block">
            <div className="code-header">
              <span>{lang}</span>
              <button className="copy-btn" onClick={copy}>
                {copied ? <><Check size={13} /> Copied!</> : <><Copy size={13} /> Copy</>}
              </button>
            </div>
            <pre><code>{algo.code[lang] || '// Coming soon'}</code></pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Algorithms() {
  const [algos, setAlgos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ category: '', difficulty: '', search: '' });
  const [selected, setSelected] = useState(null);
  const [bookmarks, setBookmarks] = useState(new Set());
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      api.get('/auth/me').then(res => {
        setBookmarks(new Set(res.data.user.bookmarkedAlgorithms.map(a => a._id)));
      });
    }
  }, [user]);

  const fetchAlgos = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.category) params.set('category', filters.category);
      if (filters.difficulty) params.set('difficulty', filters.difficulty);
      if (filters.search) params.set('search', filters.search);
      const res = await api.get(`/algorithms?${params}`);
      setAlgos(res.data.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAlgos(); }, []);

  const handleBookmark = async (id) => {
    if (!user) { toast.error('Login to bookmark algorithms'); return; }
    try {
      const res = await api.post(`/algorithms/${id}/bookmark`);
      setBookmarks(prev => {
        const next = new Set(prev);
        res.data.bookmarked ? next.add(id) : next.delete(id);
        return next;
      });
      toast.success(res.data.bookmarked ? 'Bookmarked!' : 'Removed bookmark');
    } catch { toast.error('Failed to bookmark'); }
  };

  return (
    <div className="container section">
      <div className="page-header">
        <h1>Algorithms Library</h1>
        <p>Searchable reference with code in JavaScript, C++, and Python.</p>
      </div>

      <div className="filters">
        <div className="filter-group">
          <label>Search</label>
          <input className="filter-input" placeholder="e.g. binary search..."
            value={filters.search} onChange={e => setFilters({ ...filters, search: e.target.value })}
            onKeyDown={e => e.key === 'Enter' && fetchAlgos()} />
        </div>
        <div className="filter-group">
          <label>Category</label>
          <select className="filter-select" value={filters.category}
            onChange={e => setFilters({ ...filters, category: e.target.value })}>
            <option value="">All</option>
            {['Searching','Sorting','Graph','String','DP','Math','Tree'].map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="filter-group">
          <label>Difficulty</label>
          <select className="filter-select" value={filters.difficulty}
            onChange={e => setFilters({ ...filters, difficulty: e.target.value })}>
            <option value="">All</option>
            {['Easy','Medium','Hard'].map(d => <option key={d}>{d}</option>)}
          </select>
        </div>
        <button className="btn btn-primary btn-sm" onClick={fetchAlgos}>Search</button>
      </div>

      {loading ? <div className="loading">Loading algorithms...</div> : (
        <div className="grid-2">
          {algos.map(a => (
            <div key={a._id} className="card" style={{ cursor: 'pointer' }} onClick={() => setSelected(a)}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h3 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>{a.name}</h3>
                <button className="copy-btn" onClick={e => { e.stopPropagation(); handleBookmark(a._id); }}>
                  {bookmarks.has(a._id) ? <BookmarkCheck size={16} color="#a89bff" /> : <Bookmark size={16} />}
                </button>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.6rem' }}>
                <span className="badge badge-purple">{a.category}</span>
                <span className="badge badge-teal">{a.complexity}</span>
                <span className={`badge badge-${a.difficulty.toLowerCase()}`}>{a.difficulty}</span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{a.description}</p>
            </div>
          ))}
        </div>
      )}

      {selected && (
        <CodeModal algo={selected} onClose={() => setSelected(null)}
          bookmarked={bookmarks.has(selected._id)}
          onBookmark={() => handleBookmark(selected._id)} />
      )}
    </div>
  );
}