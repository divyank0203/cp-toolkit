// Complexity.jsx
import { useState } from 'react';
import api from '../api/axios';

const OPTIONS = ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)', 'O(n^2)', 'O(2^n)', 'O(n!)'];

export default function Complexity() {
  const [n, setN] = useState(10);
  const [selected, setSelected] = useState(new Set(['O(1)', 'O(log n)', 'O(n)', 'O(n log n)', 'O(n^2)']));
  const [results, setResults] = useState(null);

  const toggle = (v) => setSelected(prev => { const s = new Set(prev); s.has(v) ? s.delete(v) : s.add(v); return s; });

  const calculate = async () => {
    const res = await api.post('/complexity/calculate', { n, complexities: [...selected] });
    setResults(res.data.results);
  };

  return (
    <div className="container section">
      <div className="page-header"><h1>Complexity Analyzer</h1><p>See how algorithms scale with input size n.</p></div>
      <div className="complexity-tool">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="slider-row">
            <label>Input size n =</label>
            <input type="range" min="1" max="20" value={n} onChange={e => setN(+e.target.value)} />
            <span className="slider-val">{n}</span>
          </div>
          <div>
            <label style={{ fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>Complexities to compare:</label>
            <div className="checkbox-list">
              {OPTIONS.map(o => (
                <label key={o} className="cb-label">
                  <input type="checkbox" checked={selected.has(o)} onChange={() => toggle(o)} /> {o}
                </label>
              ))}
            </div>
          </div>
          <button className="btn btn-primary" style={{ width: 'fit-content' }} onClick={calculate}>Calculate</button>
        </div>
        {results && (
          <div className="results-grid">
            {Object.entries(results).map(([k, v]) => (
              <div key={k} className="result-card">
                <div className="notation">{k}</div>
                <div className="value">{v.toLocaleString()}</div>
              </div>
            ))}
          </div>
        )}
      </div>
      <h2 style={{ marginBottom: '1rem', fontSize: '1.4rem', fontWeight: 700 }}>Big-O Cheat Sheet</h2>
      <table className="complexity-table">
        <thead><tr>{['Notation','Name','n=10','n=100','n=1000','Verdict'].map(h => <th key={h}>{h}</th>)}</tr></thead>
        <tbody>
          {[
            ['O(1)','Constant','1','1','1','Excellent','#4ade80'],
            ['O(log n)','Logarithmic','3','7','10','Excellent','#4ade80'],
            ['O(n)','Linear','10','100','1,000','Good','#34d399'],
            ['O(n log n)','Linearithmic','33','664','9,966','Good','#34d399'],
            ['O(n²)','Quadratic','100','10,000','1,000,000','Fair','#fbbf24'],
            ['O(2ⁿ)','Exponential','1,024','10^30','10^301','Bad','#f87171'],
            ['O(n!)','Factorial','3.6M','~∞','~∞','Terrible','#f87171'],
          ].map(([n,name,a,b,c,v,color]) => (
            <tr key={n}>
              <td style={{ fontFamily: 'var(--mono)', color: 'var(--primary)' }}>{n}</td>
              <td>{name}</td><td>{a}</td><td>{b}</td><td>{c}</td>
              <td><span className="badge" style={{ background: `${color}20`, color }}>{v}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}