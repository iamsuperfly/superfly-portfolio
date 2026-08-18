import Link from 'next/link';
import ResetPasswordForm from '../../../components/admin/ResetPasswordForm';

export const dynamic = 'force-dynamic';

export default function ResetPasswordPage() {
  return (
    <main className="admin-auth-shell">
      <div className="admin-auth-card">
        <p className="admin-nav-kicker">Private workspace</p>
        <h1>Set a new password</h1>
        <p className="admin-auth-copy">Use a new password to regain access to the Project CMS.</p>
        <ResetPasswordForm />
        <Link className="back-link" href="/admin/login">← Back to sign in</Link>
      </div>
    </main>
  );
}