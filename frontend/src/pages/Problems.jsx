import { useState, useEffect } from 'react';
import { useAuth } from '../context/Authcontext';
import api from '../api/axios';
import toast from 'react-hot-toast';
import { ExternalLink, CheckCircle2, Circle } from 'lucide-react';

export default function Problems() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [solved, setSolved] = useState(new Set());
  const [filters, setFilters] = useState({ difficulty: '', tag: '' });
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      api.get('/auth/me').then(res => {
        setSolved(new Set(res.data.user.solvedProblems.map(p => p._id)));
      });
    }
  }, [user]);

  const fetchProblems = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.difficulty) params.set('difficulty', filters.difficulty);
      if (filters.tag) params.set('tag', filters.tag);
      const res = await api.get(`/problems?${params}`);
      setProblems(res.data.data);
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchProblems(); }, []);

  const toggleSolved = async (id) => {
    if (!user) { toast.error('Login to track solved problems'); return; }
    try {
      const res = await api.post(`/problems/${id}/solve`);
      setSolved(prev => {
        const next = new Set(prev);
        res.data.solved ? next.add(id) : next.delete(id);
        return next;
      });
      toast.success(res.data.solved ? 'Marked as solved!' : 'Unmarked');
    } catch { toast.error('Failed to update'); }
  };

  return (
    <div className="container section">
      <div className="page-header">
        <h1>Problem Set</h1>
        <p>Curated problems from top platforms. Track what you've solved.</p>
      </div>

      <div className="filters">
        <div className="filter-group">
          <label>Difficulty</label>
          <select className="filter-select" value={filters.difficulty}
            onChange={e => setFilters({ ...filters, difficulty: e.target.value })}>
            <option value="">All</option>
            {['Easy','Medium','Hard'].map(d => <option key={d}>{d}</option>)}
          </select>
        </div>
        <div className="filter-group">
          <label>Tag</label>
          <input className="filter-input" placeholder="e.g. Graph, DP..."
            value={filters.tag} onChange={e => setFilters({ ...filters, tag: e.target.value })} />
        </div>
        <button className="btn btn-primary btn-sm" onClick={fetchProblems}>Filter</button>
      </div>

      {loading ? <div className="loading">Loading problems...</div> : (
        <div>
          {problems.map(p => (
            <div key={p._id} className="problem-row">
              <button className="solved-btn" style={{ border: 'none', background: 'none', padding: 0 }}
                onClick={() => toggleSolved(p._id)}>
                {solved.has(p._id)
                  ? <CheckCircle2 size={20} color="#4ade80" />
                  : <Circle size={20} color="var(--text-muted)" />}
              </button>
              <a href={p.link} target="_blank" rel="noopener" className="problem-title">{p.title}</a>
              <div className="tags">{p.tags.map(t => <span key={t} className="tag">{t}</span>)}</div>
              <span className={`badge badge-${p.difficulty.toLowerCase()}`}>{p.difficulty}</span>
              <span className="badge" style={{ background: 'var(--bg-card2)', color: 'var(--text-muted)' }}>{p.platform}</span>
              <a href={p.link} target="_blank" rel="noopener" style={{ color: 'var(--text-muted)' }}>
                <ExternalLink size={16} />
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}