import { useState } from 'react';
import LoadingProgress from '../components/LoadingProgress';
import ModeSelector from '../components/ModeSelector';
import ResultPanel from '../components/ResultPanel';

export default function Home() {
  const [email, setEmail] = useState('founder@neuroforge.ai');
  const [password, setPassword] = useState('demo123');
  const [token, setToken] = useState('');
  const [prompt, setPrompt] = useState('Build a futuristic AI robotics agency site with holographic sections.');
  const [mode, setMode] = useState('website');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const login = async () => {
    setError('');
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || 'Login failed');
      return;
    }
    setToken(data.token);
  };

  const generate = async () => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const endpoint = mode === 'website' ? '/api/generate-website' : mode === 'video' ? '/api/generate-video' : '/api/generate-launchkit';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ prompt, mode })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Generation failed');
      }
      setResult(data.data || data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto min-h-screen max-w-6xl space-y-8 px-6 py-10">
      <header className="space-y-2 text-center">
        <h1 className="bg-gradient-to-r from-violet-400 via-cyan-300 to-pink-400 bg-clip-text text-5xl font-bold text-transparent">
          NeuroForge AI
        </h1>
        <p className="text-slate-300">Generate immersive 3D websites, cinematic videos, and launch kits.</p>
      </header>

      <section className="glass-card grid gap-4 p-6 md:grid-cols-4">
        <input className="rounded-xl border border-white/10 bg-black/30 px-4 py-3" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input
          className="rounded-xl border border-white/10 bg-black/30 px-4 py-3"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="button" className="neon-button" onClick={login}>
          {token ? 'Authenticated' : 'Get JWT'}
        </button>
        <a href="/dashboard" className="glass-card flex items-center justify-center rounded-xl px-4 py-3 text-sm text-cyan-300">
          Dashboard
        </a>
      </section>

      <section className="glass-card space-y-5 p-6">
        <textarea
          className="h-28 w-full rounded-xl border border-white/10 bg-black/30 p-4"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your project..."
        />
        <ModeSelector mode={mode} onChange={setMode} />
        <div className="flex items-center gap-3">
          <button type="button" className="neon-button" onClick={generate} disabled={!token || loading}>
            Generate
          </button>
          {!token && <span className="text-sm text-amber-300">Authenticate first to generate.</span>}
        </div>
        <LoadingProgress loading={loading} />
        {error && <p className="text-sm text-rose-300">{error}</p>}
      </section>

      <ResultPanel result={result} />
    </main>
  );
}
