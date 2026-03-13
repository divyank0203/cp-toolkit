import { Link } from 'react-router-dom';
import { Zap, Database, FileCode, BarChart2, PuzzleIcon, Trophy } from 'lucide-react';

const features = [
  { icon: <Zap size={22} />, color: 'purple', title: 'Algorithms Library', desc: 'Sorting, searching, graph algorithms with JS, C++ & Python code examples.', to: '/algorithms' },
  { icon: <Database size={22} />, color: 'teal', title: 'Data Structures', desc: 'Segment trees, tries, heaps, union-find with operation complexity tables.', to: '/data-structures' },
  { icon: <FileCode size={22} />, color: 'amber', title: 'Code Templates', desc: 'Contest-ready templates for fast I/O, DSU, graph setup in C++ & Python.', to: '/templates' },
  { icon: <BarChart2 size={22} />, color: 'blue', title: 'Complexity Analyzer', desc: 'Interactive Big-O calculator — compare how algorithms scale with n.', to: '/complexity' },
  { icon: <PuzzleIcon size={22} />, color: 'coral', title: 'Problem Set', desc: 'Curated LeetCode and Codeforces problems. Mark solved, filter by topic.', to: '/problems' },
  { icon: <Trophy size={22} />, color: 'green', title: 'Dashboard', desc: 'Track solved problems, bookmarked algorithms, and your progress over time.', to: '/dashboard' },
];

const colorMap = {
  purple: { bg: 'rgba(108,99,255,0.12)', color: '#a89bff' },
  teal: { bg: 'rgba(0,200,150,0.12)', color: '#34d399' },
  amber: { bg: 'rgba(245,158,11,0.12)', color: '#fbbf24' },
  blue: { bg: 'rgba(59,130,246,0.12)', color: '#60a5fa' },
  coral: { bg: 'rgba(255,107,107,0.12)', color: '#f87171' },
  green: { bg: 'rgba(34,197,94,0.12)', color: '#4ade80' },
};

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="hero-badge">🏆 For Competitive Programmers</div>
          <h1 className="hero-title">Master Competitive<br /><span className="gradient-text">Programming</span></h1>
          <p className="hero-subtitle">Algorithms, data structures, templates, and complexity tools — all in one place, with progress tracking.</p>
          <div className="hero-actions">
            <Link to="/algorithms" className="btn btn-primary"><Zap size={16} /> Browse Algorithms</Link>
            <Link to="/register" className="btn btn-outline">Get Started Free</Link>
          </div>
          <div className="hero-stats">
            {[['50+','Algorithms'],['20+','Data Structures'],['100+','Templates'],['500+','Problems']].map(([n,l]) => (
              <div key={l}><span className="stat-num">{n}</span><span className="stat-label">{l}</span></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Everything You Need</h2>
          <div className="grid-3">
            {features.map(f => {
              const c = colorMap[f.color];
              return (
                <Link key={f.to} to={f.to} className="card" style={{ textDecoration: 'none' }}>
                  <div style={{ width: 46, height: 46, borderRadius: 10, background: c.bg, color: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>{f.icon}</div>
                  <h3 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>{f.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.6 }}>{f.desc}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}