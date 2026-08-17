'use client';

export default function ErrorPage({ reset }) {
  return (
    <main className="site-shell">
      <div className="empty-state error-state">
        <p className="project-label">Something went wrong</p>
        <p className="empty-state-subtext">The portfolio could not load this content right now.</p>
        <button className="button button-primary" type="button" onClick={() => reset()}>Try again</button>
      </div>
    </main>
  );
}