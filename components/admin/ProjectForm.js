'use client';

import { useState } from 'react';
import Link from 'next/link';
import { saveProject } from '../../app/admin/actions';

const MAX_GALLERY_ITEMS = 3;

function createInitialSlots(project) {
  const gallery = [...(project?.gallery || [])]
    .sort((a, b) => a.display_order - b.display_order)
    .slice(0, MAX_GALLERY_ITEMS);

  return Array.from({ length: MAX_GALLERY_ITEMS }, (_, index) => (
    gallery[index]
      ? { type: 'existing', item: gallery[index] }
      : { type: 'new', key: `new-${index}` }
  ));
}

export default function ProjectForm({ project, error }) {
  const technologies = project?.technologies?.join(', ') || '';
  const [slots, setSlots] = useState(() => createInitialSlots(project));
  const [removedIds, setRemovedIds] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState({});
  const [pendingDelete, setPendingDelete] = useState(null);

  function removeExistingItem(slotIndex) {
    const slot = slots[slotIndex];
    if (slot.type !== 'existing') {
      return;
    }

    setRemovedIds((current) => [...current, slot.item.id]);
    setSlots((current) => current.map((item, index) => (
      index === slotIndex ? { type: 'new', key: `new-${slotIndex}-${slot.item.id}` } : item
    )));
    setPendingDelete(null);
  }

  return (
    <form className="admin-form admin-project-form" action={saveProject}>
      {error ? <p className="form-error" role="alert">{error}</p> : null}
      {project?.id ? <input type="hidden" name="id" value={project.id} /> : null}
      {removedIds.map((id) => <input key={id} type="hidden" name="gallery_remove_id" value={id} />)}
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
        <label className="admin-form-full">
          Extended Description
          <textarea
            name="extended_description"
            defaultValue={project?.extended_description || ''}
            placeholder="Add a longer project story, including the problem, approach, technical decisions, and outcome."
          />
          <span className="form-help">Optional. This appears on the project detail page, while the short description remains on cards.</span>
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
        <div className="admin-form-full admin-gallery-fieldset">
          <div className="admin-field-heading">
            <div>
              <strong>Gallery</strong>
              <span className="form-help">Add up to 3 supporting images. Every image needs a label.</span>
            </div>
            <span className="admin-order">Maximum 3</span>
          </div>
          <div className="admin-gallery-grid">
            {slots.map((slot, index) => (
              <div className="admin-gallery-slot" key={slot.type === 'existing' ? slot.item.id : slot.key}>
                <span className="admin-gallery-slot-number">{index + 1}</span>
                {slot.type === 'existing' ? (
                  <>
                    <div className="admin-gallery-preview">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={slot.item.image_url} alt="" />
                    </div>
                    <input type="hidden" name="gallery_existing_id" value={slot.item.id} />
                    <input type="hidden" name={`gallery_existing_order_${slot.item.id}`} value={index} />
                    <label>
                      Label
                      <input
                        name={`gallery_existing_label_${slot.item.id}`}
                        defaultValue={slot.item.label}
                        placeholder="e.g. Homepage dashboard"
                        required
                      />
                    </label>
                    {pendingDelete === index ? (
                      <div className="delete-confirmation gallery-delete-confirmation" role="alertdialog">
                        <div>
                          <strong>Delete this gallery image?</strong>
                          <p>This action will apply when you save.</p>
                        </div>
                        <div className="admin-row-actions">
                          <button className="button button-ghost" type="button" onClick={() => setPendingDelete(null)}>
                            Cancel
                          </button>
                          <button className="button button-danger" type="button" onClick={() => removeExistingItem(index)}>
                            Delete
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button className="button button-danger gallery-delete-button" type="button" onClick={() => setPendingDelete(index)}>
                        Delete
                      </button>
                    )}
                  </>
                ) : (
                  <label className="admin-gallery-upload">
                    Upload image
                    <input
                      type="file"
                      name={`gallery_image_${index}`}
                      accept="image/*"
                      onChange={(event) => setSelectedFiles((current) => ({
                        ...current,
                        [index]: event.target.files?.[0]?.name || '',
                      }))}
                    />
                    {selectedFiles[index] ? <span className="form-help">{selectedFiles[index]}</span> : null}
                    <span className="form-help">Choose an image to add this slot.</span>
                    <input
                      name={`gallery_new_label_${index}`}
                      placeholder="Label, e.g. Mobile experience"
                    />
                  </label>
                )}
              </div>
            ))}
          </div>
        </div>
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