export default function BillingPlaceholder() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl items-center px-6">
      <div className="glass-card w-full space-y-3 p-6 text-center">
        <h1 className="text-3xl font-bold">Stripe Placeholder</h1>
        <p className="text-slate-300">Configure STRIPE_SECRET_KEY to enable live checkout.</p>
        <a href="/" className="neon-button inline-block">
          Back to app
        </a>
      </div>
    </main>
  );
}
