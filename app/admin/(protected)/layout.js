import AdminNav from '../../../components/admin/AdminNav';
import { requireAdmin } from '../../../lib/auth';

export default async function ProtectedAdminLayout({ children }) {
  const { admin } = await requireAdmin();

  return (
    <main className="admin-shell">
      <AdminNav displayName={admin.display_name} />
      <div className="admin-content">{children}</div>
    </main>
  );
}