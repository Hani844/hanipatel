import ThreeScene from './ThreeScene';

export default function ResultPanel({ result }) {
  if (!result) return null;

  return (
    <div className="space-y-6">
      {(result.website || result.data?.website) && (
        <div className="glass-card p-5">
          <h3 className="mb-3 text-lg font-semibold">3D Website Preview</h3>
          <ThreeScene config={(result.website || result.data?.website).threejsScene} />
          <div className="mt-4 rounded-xl border border-white/10 bg-black/30 p-3">
            <iframe
              title="Website Preview"
              srcDoc={`<html><body style='font-family:sans-serif;background:#020617;color:#f8fafc;padding:24px'><h1>${
                (result.website || result.data?.website).layout?.hero?.title || 'Generated Website'
              }</h1><p>${(result.website || result.data?.website).layout?.hero?.subtitle || ''}</p></body></html>`}
              className="h-44 w-full rounded-lg"
            />
          </div>
          {result.websiteZip && (
            <a href={result.websiteZip} download="neuroforge-site.zip" className="neon-button mt-4 inline-block">
              Download Website ZIP
            </a>
          )}
        </div>
      )}

      {(result.video || result.data?.video) && (
        <div className="glass-card p-5">
          <h3 className="mb-3 text-lg font-semibold">Cinematic Video</h3>
          <video controls className="w-full rounded-xl border border-white/10" src={(result.video || result.data?.video).videoUrl} />
          <pre className="mt-4 overflow-auto rounded-lg bg-black/40 p-3 text-xs text-slate-300">
            {JSON.stringify((result.video || result.data?.video).storyboard, null, 2)}
          </pre>
        </div>
      )}

      {result.previewUrl && (
        <div className="glass-card p-5 text-sm text-slate-300">
          Preview Link: <span className="text-cyan-300">{result.previewUrl}</span>
        </div>
      )}
    </div>
  );
}
