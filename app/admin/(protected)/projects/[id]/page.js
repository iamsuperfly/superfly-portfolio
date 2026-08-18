import { notFound } from 'next/navigation';
import ProjectForm from '../../../../../components/admin/ProjectForm';
import { requireAdmin } from '../../../../../lib/auth';

export const dynamic = 'force-dynamic';

export default async function EditProjectPage({ params, searchParams }) {
  const { id } = await params;
  const query = await searchParams;
  const { supabase } = await requireAdmin();
  const { data: project } = await supabase
    .from('projects')
    .select('*, gallery:project_gallery_items(*)')
    .eq('id', id)
    .maybeSingle();

  if (!project) {
    notFound();
  }

  return (
    <>
      <div className="admin-heading-row">
        <div>
          <p className="section-label">Content management</p>
          <h1 className="page-title">Edit project</h1>
        </div>
      </div>
      <ProjectForm project={project} error={query.error} />
    </>
  );
}