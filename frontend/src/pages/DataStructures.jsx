// DataStructures.jsx
import { useState, useEffect } from 'react';
import api from '../api/axios';

export default function DataStructures() {
  const [list, setList] = useState([]);
  useEffect(() => { api.get('/algorithms?category=Tree').then(r => setList(r.data.data)); }, []);

  const ds = [
    { name: 'Stack', category: 'Linear', useCase: 'DFS, undo, expression evaluation', ops: { push: 'O(1)', pop: 'O(1)', peek: 'O(1)' } },
    { name: 'Queue', category: 'Linear', useCase: 'BFS, scheduling, sliding window', ops: { enqueue: 'O(1)', dequeue: 'O(1)', peek: 'O(1)' } },
    { name: 'Min-Heap', category: 'Tree', useCase: "Priority queue, Dijkstra's, top-K", ops: { insert: 'O(log n)', extractMin: 'O(log n)', peek: 'O(1)' } },
    { name: 'Segment Tree', category: 'Tree', useCase: 'Range queries and updates', ops: { build: 'O(n)', query: 'O(log n)', update: 'O(log n)' } },
    { name: 'Trie', category: 'Tree', useCase: 'Prefix search, autocomplete', ops: { insert: 'O(m)', search: 'O(m)', prefix: 'O(m)' } },
    { name: 'Union-Find (DSU)', category: 'Set', useCase: 'Connected components, Kruskal MST', ops: { find: 'O(α(n))', union: 'O(α(n))' } },
  ];

  return (
    <div className="container section">
      <div className="page-header"><h1>Data Structures</h1><p>Operation complexities for common CP data structures.</p></div>
      <div className="grid-2">
        {ds.map(d => (
          <div key={d.name} className="card">
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span className="badge badge-purple">{d.category}</span>
            </div>
            <h3 style={{ fontWeight: 600, marginBottom: '0.3rem' }}>{d.name}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>{d.useCase}</p>
            <table style={{ width: '100%', fontSize: '0.85rem', borderCollapse: 'collapse' }}>
              {Object.entries(d.ops).map(([op, c]) => (
                <tr key={op}>
                  <td style={{ color: 'var(--text-muted)', padding: '0.3rem 0', borderBottom: '1px solid var(--border)' }}>{op}</td>
                  <td style={{ textAlign: 'right', color: 'var(--secondary)', fontFamily: 'var(--mono)', fontWeight: 600, borderBottom: '1px solid var(--border)' }}>{c}</td>
                </tr>
              ))}
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}