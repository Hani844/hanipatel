export default function LoadingProgress({ loading }) {
  if (!loading) return null;

  return (
    <div className="space-y-2">
      <div className="text-sm text-slate-300">Generating assets...</div>
      <div className="progress-bar">
        <span />
      </div>
    </div>
  );
}
