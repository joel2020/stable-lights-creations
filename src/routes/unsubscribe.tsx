import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { PageShell } from '@/components/Layout';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/unsubscribe')({
  validateSearch: (s: Record<string, unknown>): { token?: string } => ({
    token: typeof s.token === 'string' ? s.token : undefined,
  }),
  component: Unsubscribe,
  head: () => ({ meta: [{ title: 'Unsubscribe · It\'s Lit Neon' }] }),
});

type State = 'loading' | 'ready' | 'already' | 'invalid' | 'submitting' | 'done' | 'error';

function Unsubscribe() {
  const { token } = Route.useSearch();
  const [state, setState] = useState<State>('loading');

  useEffect(() => {
    if (!token) { setState('invalid'); return; }
    fetch(`/email/unsubscribe?token=${encodeURIComponent(token)}`)
      .then(async (r) => {
        const j = await r.json().catch(() => ({}));
        if (!r.ok) { setState('invalid'); return; }
        if (j.used) setState('already');
        else setState('ready');
      })
      .catch(() => setState('error'));
  }, [token]);

  const confirm = async () => {
    if (!token) return;
    setState('submitting');
    try {
      const r = await fetch('/email/unsubscribe', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });
      setState(r.ok ? 'done' : 'error');
    } catch { setState('error'); }
  };

  return (
    <PageShell>
      <section className="mx-auto max-w-md px-4 py-20 text-center">
        <h1 className="font-display text-4xl">Email Preferences</h1>
        <div className="mt-6 text-muted-foreground">
          {state === 'loading' && 'Checking your link…'}
          {state === 'invalid' && 'This unsubscribe link is invalid or expired.'}
          {state === 'already' && 'You\'re already unsubscribed.'}
          {state === 'ready' && (
            <>
              <p>Click below to stop receiving emails from It's Lit Neon.</p>
              <Button onClick={confirm} className="mt-6 bg-[var(--neon-orange)] text-black hover:bg-[var(--neon-orange)]/90 font-bold">
                Confirm unsubscribe
              </Button>
            </>
          )}
          {state === 'submitting' && 'Processing…'}
          {state === 'done' && 'You\'ve been unsubscribed. Sorry to see you go.'}
          {state === 'error' && 'Something went wrong. Please email support@itslitneon.com.'}
        </div>
      </section>
    </PageShell>
  );
}
