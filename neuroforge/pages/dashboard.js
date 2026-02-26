import { useState } from 'react';

export default function Dashboard() {
  const [token, setToken] = useState('');
  const [history, setHistory] = useState([]);
  const [error, setError] = useState('');

  const loadHistory = async () => {
    setError('');
    const res = await fetch('/api/history', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || 'Failed to load history');
      return;
    }
    setHistory(data.data.history);
  };

  const upgrade = async () => {
    const res = await fetch('/api/stripe/checkout', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    if (data.data?.checkoutUrl) {
      window.location.href = data.data.checkoutUrl;
    }
  };

  return (
    <main className="mx-auto min-h-screen max-w-5xl space-y-6 px-6 py-10">
      <h1 className="text-3xl font-bold">Generation Dashboard</h1>
      <section className="glass-card space-y-3 p-5">
        <input
          className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Paste JWT token"
        />
        <div className="flex gap-3">
          <button type="button" className="neon-button" onClick={loadHistory}>
            Load History
          </button>
          <button type="button" className="glass-card rounded-xl px-4 py-3" onClick={upgrade}>
            Upgrade with Stripe
          </button>
        </div>
        {error && <p className="text-rose-300">{error}</p>}
      </section>

      <section className="space-y-3">
        {history.map((item) => (
          <article key={item.id} className="glass-card p-4">
            <div className="mb-2 flex items-center justify-between text-sm text-slate-400">
              <span>{item.type.toUpperCase()}</span>
              <span>{new Date(item.createdAt).toLocaleString()}</span>
            </div>
            <p className="text-slate-200">{item.prompt}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
