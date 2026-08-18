'use client';

import { useState } from 'react';
import { deleteProject } from '../../app/admin/actions';

export default function DeleteProjectButton({ projectId, projectTitle }) {
  const [isConfirming, setIsConfirming] = useState(false);

  if (isConfirming) {
    return (
      <div className="delete-confirmation" role="alertdialog" aria-label={`Delete ${projectTitle}`}>
        <div>
          <strong>Delete this project?</strong>
          <p>This action cannot be undone.</p>
        </div>
        <div className="admin-row-actions">
          <button className="button button-ghost" type="button" onClick={() => setIsConfirming(false)}>
            Cancel
          </button>
          <form action={deleteProject}>
            <input type="hidden" name="id" value={projectId} />
            <button className="button button-danger" type="submit">Delete</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <button className="button button-danger" type="button" onClick={() => setIsConfirming(true)}>
      Delete
    </button>
  );
}