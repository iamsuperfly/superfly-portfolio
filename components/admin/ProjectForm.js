import Link from 'next/link';
import { saveProject } from '../../app/admin/actions';

export default function ProjectForm({ project, error }) {
  const technologies = project?.technologies?.join(', ') || '';

  return (
    <form className="admin-form admin-project-form" action={saveProject}>
      {error ? <p className="form-error" role="alert">{error}</p> : null}
      {project?.id ? <input type="hidden" name="id" value={project.id} /> : null}
      <div className="admin-form-grid">
        <label>
          Title
          <input name="title" defaultValue={project?.title || ''} required />
        </label>
        <label>
          Slug
          <input
            name="slug"
            defaultValue={project?.slug || ''}
            placeholder="project-name"
            pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
            required
          />
        </label>
        <label className="admin-form-full">
          Description
          <textarea name="description" defaultValue={project?.description || ''} required />
        </label>
        <label>
          Technologies
          <input
            name="technologies"
            defaultValue={technologies}
            placeholder="React, Next.js, Supabase"
          />
          <span className="form-help">Separate technologies with commas.</span>
        </label>
        <label>
          Display order
          <input
            type="number"
            name="display_order"
            min="0"
            step="1"
            defaultValue={project?.display_order ?? 0}
          />
        </label>
        <label className="admin-form-full">
          Image URL or local path
          <input
            name="image_url"
            defaultValue={project?.image_url || ''}
            placeholder="/images/projects/example.png"
          />
          <span className="form-help">Use this for an existing public image, or upload a replacement below.</span>
        </label>
        <label className="admin-form-full">
          Upload a replacement image
          <input type="file" name="image" accept="image/*" />
          <span className="form-help">Uploaded files are stored in the project-images Supabase bucket.</span>
        </label>
        <label>
          Project URL
          <input type="url" name="project_url" defaultValue={project?.project_url || ''} placeholder="https://" />
        </label>
        <label>
          GitHub URL
          <input type="url" name="github_url" defaultValue={project?.github_url || ''} placeholder="https://github.com/" />
        </label>
        <label className="admin-checkbox">
          <input type="checkbox" name="highlighted" defaultChecked={project?.highlighted ?? false} />
          Highlight this project on the homepage
        </label>
        <label className="admin-checkbox">
          <input type="checkbox" name="published" defaultChecked={project?.published ?? true} />
          Publish this project publicly
        </label>
      </div>
      <div className="admin-form-actions">
        <button className="button button-primary" type="submit">
          {project ? 'Save changes' : 'Create project'}
        </button>
        <Link className="button button-ghost" href="/admin">Cancel</Link>
      </div>
    </form>
  );
}