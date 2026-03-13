import { useState, useEffect } from 'react';
import api from '../api/axios';
import { Trophy, BookOpen, Target, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get('/user/dashboard').then(res => setData(res.data));
  }, []);

  if (!data) return <div className="loading">Loading dashboard...</div>;

  const { user, stats } = data;

  return (
    <div className="container section">
      <div className="page-header">
        <h1>👋 Welcome, {user.username}</h1>
        <p>Your competitive programming progress at a glance.</p>
      </div>

      <div className="stats-grid">
        {[
          { icon: <Trophy size={22} color="#fbbf24" />, num: stats.totalSolved, lbl: 'Problems Solved' },
          { icon: <Target size={22} color="#4ade80" />, num: stats.easySolved, lbl: 'Easy Solved' },
          { icon: <TrendingUp size={22} color="#fbbf24" />, num: stats.mediumSolved, lbl: 'Medium Solved' },
          { icon: <Trophy size={22} color="#f87171" />, num: stats.hardSolved, lbl: 'Hard Solved' },
          { icon: <BookOpen size={22} color="#a89bff" />, num: stats.bookmarked, lbl: 'Bookmarked Algos' },
        ].map((s, i) => (
          <div key={i} className="stat-card">
            <div style={{ marginBottom: '0.5rem' }}>{s.icon}</div>
            <div className="num">{s.num}</div>
            <div className="lbl">{s.lbl}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div className="card">
          <h2 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Bookmarked Algorithms</h2>
          {user.bookmarkedAlgorithms.length === 0
            ? <p style={{ color: 'var(--text-muted)' }}>No bookmarks yet — browse algorithms to add some.</p>
            : user.bookmarkedAlgorithms.map(a => (
              <div key={a._id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--border)' }}>
                <span style={{ fontWeight: 500 }}>{a.name}</span>
                <span className="badge badge-purple">{a.category}</span>
              </div>
            ))}
        </div>

        <div className="card">
          <h2 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Recently Solved</h2>
          {user.solvedProblems.length === 0
            ? <p style={{ color: 'var(--text-muted)' }}>No problems solved yet — head to the problems page.</p>
            : user.solvedProblems.slice(-8).reverse().map(p => (
              <div key={p._id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--border)' }}>
                <span style={{ fontWeight: 500 }}>{p.title}</span>
                <span className={`badge badge-${p.difficulty.toLowerCase()}`}>{p.difficulty}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}