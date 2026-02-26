const modes = [
  { value: 'website', label: '3D Website' },
  { value: 'video', label: 'Video' },
  { value: 'launchkit', label: 'Full Launch Kit' }
];

export default function ModeSelector({ mode, onChange }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {modes.map((item) => (
        <button
          type="button"
          key={item.value}
          onClick={() => onChange(item.value)}
          className={`glass-card px-4 py-3 text-sm transition ${
            mode === item.value ? 'border-cyan-400 shadow-neon' : 'hover:border-white/30'
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
