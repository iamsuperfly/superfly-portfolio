import Link from 'next/link';
import { logout } from '../../app/admin/actions';

export default function AdminNav({ displayName }) {
  return (
    <header className="admin-nav">
      <div>
        <p className="admin-nav-kicker">Private workspace</p>
        <p className="admin-nav-title">Project CMS</p>
      </div>
      <nav className="admin-nav-actions" aria-label="Admin navigation">
        <Link className="admin-nav-link" href="/">View portfolio</Link>
        <form action={logout}>
          <button className="button button-ghost admin-logout" type="submit">
            Sign out{displayName ? `, ${displayName}` : ''}
          </button>
        </form>
      </nav>
    </header>
  );
}