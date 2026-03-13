// Templates.jsx
import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

const templates = {
  cpp: [
    { name: 'Fast I/O Base', code: `#include <bits/stdc++.h>\nusing namespace std;\n#define int long long\n#define pb push_back\n#define all(x) x.begin(), x.end()\nconst int MOD = 1e9 + 7;\nvoid solve() {\n  // solution here\n}\nsigned main() {\n  ios_base::sync_with_stdio(false);\n  cin.tie(NULL);\n  int t; cin >> t;\n  while (t--) solve();\n}` },
    { name: 'DSU / Union-Find', code: `struct DSU {\n  vector<int> p, rank;\n  DSU(int n) : p(n), rank(n, 0) { iota(p.begin(), p.end(), 0); }\n  int find(int x) { return p[x]==x ? x : p[x]=find(p[x]); }\n  bool unite(int x, int y) {\n    x=find(x); y=find(y);\n    if(x==y) return false;\n    if(rank[x]<rank[y]) swap(x,y);\n    p[y]=x; if(rank[x]==rank[y]) rank[x]++;\n    return true;\n  }\n};` },
    { name: 'Dijkstra Template', code: `vector<int> dijkstra(int n, vector<vector<pair<int,int>>>& adj, int src) {\n  vector<int> dist(n, INT_MAX);\n  priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;\n  dist[src]=0; pq.push({0, src});\n  while (!pq.empty()) {\n    auto [d, u] = pq.top(); pq.pop();\n    if (d > dist[u]) continue;\n    for (auto [v, w] : adj[u])\n      if (dist[u]+w < dist[v]) { dist[v]=dist[u]+w; pq.push({dist[v], v}); }\n  }\n  return dist;\n}` },
  ],
  python: [
    { name: 'CP Base Template', code: `import sys\nfrom collections import defaultdict, deque\nfrom heapq import heappush, heappop\nfrom functools import lru_cache\ninput = sys.stdin.readline\nMOD = 10**9 + 7\n\ndef solve():\n    n = int(input())\n    # solution here\n\nt = int(input())\nfor _ in range(t): solve()` },
    { name: 'BFS Shortest Path', code: `from collections import deque\n\ndef bfs(graph, start, end):\n    queue = deque([(start, [start])])\n    visited = {start}\n    while queue:\n        node, path = queue.popleft()\n        if node == end: return path\n        for nb in graph.get(node, []):\n            if nb not in visited:\n                visited.add(nb)\n                queue.append((nb, path + [nb]))\n    return []` },
  ],
  java: [
    { name: 'Fast I/O Base', code: `import java.util.*;\nimport java.io.*;\n\npublic class Main {\n  static BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n  static StringTokenizer st;\n\n  static int ni() throws IOException {\n    while (st == null || !st.hasMoreTokens())\n      st = new StringTokenizer(br.readLine());\n    return Integer.parseInt(st.nextToken());\n  }\n\n  public static void main(String[] args) throws IOException {\n    int t = ni();\n    StringBuilder sb = new StringBuilder();\n    while (t-- > 0) sb.append(ni()).append("\\n");\n    System.out.print(sb);\n  }\n}` },
  ],
};

function TemplateCard({ t, lang }) {
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard.writeText(t.code); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return (
    <div className="card" style={{ marginBottom: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <h3 style={{ fontWeight: 600 }}>{t.name}</h3>
        <span className="badge badge-purple">{lang.toUpperCase()}</span>
      </div>
      <div className="code-block">
        <div className="code-header">
          <span>{lang === 'cpp' ? 'C++' : lang === 'python' ? 'Python 3' : 'Java'}</span>
          <button className="copy-btn" onClick={copy}>{copied ? <><Check size={13} /> Copied!</> : <><Copy size={13} /> Copy</>}</button>
        </div>
        <pre><code>{t.code}</code></pre>
      </div>
    </div>
  );
}

export default function Templates() {
  const [lang, setLang] = useState('cpp');
  return (
    <div className="container section">
      <div className="page-header"><h1>Code Templates</h1><p>Contest-ready templates. Copy, paste, compete.</p></div>
      <div className="tab-bar">
        {[['cpp','C++'],['python','Python'],['java','Java']].map(([l, label]) => (
          <button key={l} className={`tab-btn ${lang === l ? 'active' : ''}`} onClick={() => setLang(l)}>{label}</button>
        ))}
      </div>
      {(templates[lang] || []).map((t, i) => <TemplateCard key={i} t={t} lang={lang} />)}
    </div>
  );
}