import Link from 'next/link';
import DeleteProjectButton from '../../../components/admin/DeleteProjectButton';
import { requireAdmin } from '../../../lib/auth';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage({ searchParams }) {
  const { supabase } = await requireAdmin();
  const params = await searchParams;
  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: false });

  return (
    <>
      <div className="admin-heading-row">
        <div>
          <p className="section-label">Content management</p>
          <h1 className="page-title">Projects</h1>
          <p className="admin-heading-copy">Keep the portfolio current with real projects, links, and images.</p>
        </div>
        <Link className="button button-primary" href="/admin/projects/new">Add project</Link>
      </div>
      {params.message ? <p className="form-success" role="status">{params.message}</p> : null}
      {params.error ? <p className="form-error" role="alert">{params.error}</p> : null}
      {error ? (
        <div className="empty-state">
          <p className="form-error" role="alert">Projects could not be loaded: {error.message}</p>
        </div>
      ) : projects?.length ? (
        <div className="admin-project-list">
          {projects.map((project) => (
            <article className="admin-project-row" key={project.id}>
              <div className="admin-project-summary">
                <div>
                  <p className="project-label">
                    {project.highlighted ? 'Highlighted' : 'Standard'} · {project.published ? 'Published' : 'Draft'}
                  </p>
                  <h2>{project.title}</h2>
                  <p>{project.description}</p>
                </div>
                <span className="admin-order">Order {project.display_order}</span>
              </div>
              <div className="admin-row-actions">
                <Link className="button button-ghost" href={`/admin/projects/${project.id}`}>Edit</Link>
                <DeleteProjectButton projectId={project.id} projectTitle={project.title} />
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p className="project-label">No projects yet</p>
          <p className="empty-state-subtext">Add the first real project to start building the portfolio.</p>
        </div>
      )}
    </>
  );
}