import Link from 'next/link';
import LoginForm from '../../../components/admin/LoginForm';

export const dynamic = 'force-dynamic';

export default async function AdminLoginPage({ searchParams }) {
  const params = await searchParams;
  const initialError = params.error === 'not-authorized'
    ? 'This account is not authorized to manage the portfolio.'
    : '';

  return (
    <main className="admin-auth-shell">
      <div className="admin-auth-card">
        <p className="admin-nav-kicker">Private workspace</p>
        <h1>Sign in to Project CMS</h1>
        <p className="admin-auth-copy">Manage published projects without exposing the admin area on the public portfolio.</p>
        <LoginForm initialError={initialError} />
        <Link className="back-link" href="/">← Back to portfolio</Link>
      </div>
    </main>
  );
}