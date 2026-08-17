import ProjectForm from '../../../../../components/admin/ProjectForm';

export const dynamic = 'force-dynamic';

export default async function NewProjectPage({ searchParams }) {
  const params = await searchParams;

  return (
    <>
      <div className="admin-heading-row">
        <div>
          <p className="section-label">Content management</p>
          <h1 className="page-title">Add project</h1>
        </div>
      </div>
      <ProjectForm error={params.error} />
    </>
  );
}