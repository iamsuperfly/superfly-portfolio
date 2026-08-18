'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { requireAdmin } from '../../lib/auth';
import { parseTechnologies } from '../../lib/projects';

function value(formData, name) {
  return String(formData.get(name) || '').trim();
}

function optionalValue(formData, name) {
  const result = value(formData, name);
  return result || null;
}

async function uploadProjectImage(supabase, file, slug) {
  if (!(file instanceof File) || file.size === 0) {
    return null;
  }

  if (!file.type.startsWith('image/')) {
    throw new Error('Project image must be an image file.');
  }

  const extension = file.name.split('.').pop()?.toLowerCase() || 'bin';
  const path = `${slug}-${crypto.randomUUID()}.${extension}`;
  const { error } = await supabase.storage
    .from('project-images')
    .upload(path, file, { contentType: file.type, upsert: false });

  if (error) {
    throw new Error(`Could not upload project image: ${error.message}`);
  }

  const { data } = supabase.storage.from('project-images').getPublicUrl(path);
  return { path, url: data.publicUrl };
}

async function uploadGalleryImage(supabase, file, slug) {
  if (!(file instanceof File) || file.size === 0) {
    return null;
  }

  if (!file.type.startsWith('image/')) {
    throw new Error('Gallery images must be image files.');
  }

  const extension = file.name.split('.').pop()?.toLowerCase() || 'bin';
  const path = `${slug}-gallery-${crypto.randomUUID()}.${extension}`;
  const { error } = await supabase.storage
    .from('project-images')
    .upload(path, file, { contentType: file.type, upsert: false });

  if (error) {
    throw new Error(`Could not upload gallery image: ${error.message}`);
  }

  const { data } = supabase.storage.from('project-images').getPublicUrl(path);
  return { path, url: data.publicUrl };
}

function galleryOrder(formData, name) {
  const order = Number.parseInt(value(formData, name), 10);
  return Number.isInteger(order) ? order : -1;
}

async function saveGallery(supabase, projectId, slug, formData, existingGallery, uploadedGalleryPaths) {
  const existingById = new Map(existingGallery.map((item) => [item.id, item]));
  const activeIds = formData.getAll('gallery_existing_id').map(String);
  const removedIds = [...new Set(formData.getAll('gallery_remove_id').map(String))];
  const activeItems = [];
  const usedOrders = new Set();

  if (activeIds.length > 3) {
    throw new Error('A project can have no more than 3 gallery images.');
  }

  for (const id of activeIds) {
    const item = existingById.get(id);
    if (!item || removedIds.includes(id)) {
      throw new Error('The gallery changed while you were editing. Refresh and try again.');
    }

    const label = value(formData, `gallery_existing_label_${id}`);
    const displayOrder = galleryOrder(formData, `gallery_existing_order_${id}`);
    if (!label) {
      throw new Error('Every gallery image needs a label.');
    }
    if (displayOrder < 0 || displayOrder > 2 || usedOrders.has(displayOrder)) {
      throw new Error('Gallery image order is invalid. Refresh and try again.');
    }

    usedOrders.add(displayOrder);
    activeItems.push({ id, label, display_order: displayOrder });
  }

  const newItems = [];
  for (let index = 0; index < 3; index += 1) {
    const file = formData.get(`gallery_image_${index}`);
    const label = value(formData, `gallery_new_label_${index}`);
    const image = await uploadGalleryImage(supabase, file, slug);

    if (!image && label) {
      throw new Error('Choose a gallery image before adding its label.');
    }
    if (!image) {
      continue;
    }
    if (!label) {
      await supabase.storage.from('project-images').remove([image.path]);
      throw new Error('Every gallery image needs a label.');
    }
    if (usedOrders.has(index)) {
      await supabase.storage.from('project-images').remove([image.path]);
      throw new Error('Gallery image order is invalid. Refresh and try again.');
    }

    usedOrders.add(index);
    uploadedGalleryPaths.push(image.path);
    newItems.push({
      project_id: projectId,
      image_path: image.path,
      image_url: image.url,
      label,
      display_order: index,
    });
  }

  if (activeItems.length + newItems.length > 3) {
    throw new Error('A project can have no more than 3 gallery images.');
  }

  const existingIds = new Set(existingGallery.map((item) => item.id));
  if (removedIds.some((id) => !existingIds.has(id))) {
    throw new Error('The gallery changed while you were editing. Refresh and try again.');
  }

  if (removedIds.length > 0) {
    const { error } = await supabase
      .from('project_gallery_items')
      .delete()
      .eq('project_id', projectId)
      .in('id', removedIds);

    if (error) {
      throw new Error(`Could not delete gallery images: ${error.message}`);
    }

    const removedPaths = removedIds
      .map((id) => existingById.get(id)?.image_path)
      .filter(Boolean);
    if (removedPaths.length > 0) {
      await supabase.storage.from('project-images').remove(removedPaths);
    }
  }

  for (const item of activeItems) {
    const { error } = await supabase
      .from('project_gallery_items')
      .update({ label: item.label, display_order: item.display_order })
      .eq('project_id', projectId)
      .eq('id', item.id);

    if (error) {
      throw new Error(`Could not update gallery image: ${error.message}`);
    }
  }

  if (newItems.length > 0) {
    const { error } = await supabase.from('project_gallery_items').insert(newItems);
    if (error) {
      throw new Error(`Could not save gallery images: ${error.message}`);
    }
  }
}

export async function saveProject(formData) {
  const { supabase } = await requireAdmin();
  const id = value(formData, 'id');
  const slug = value(formData, 'slug');
  const existing = id
    ? (await supabase
      .from('projects')
      .select('id, image_path, gallery:project_gallery_items(id, image_path)')
      .eq('id', id)
      .maybeSingle()).data
    : null;
  const imageFile = formData.get('image');
  let uploadedImage;
  const uploadedGalleryPaths = [];
  let projectId = id;

  try {
    uploadedImage = await uploadProjectImage(supabase, imageFile, slug);
    const payload = {
      title: value(formData, 'title'),
      slug,
      description: value(formData, 'description'),
      extended_description: optionalValue(formData, 'extended_description'),
      technologies: parseTechnologies(formData.get('technologies')),
      image_url: uploadedImage?.url || optionalValue(formData, 'image_url'),
      image_path: uploadedImage?.path || existing?.image_path || null,
      project_url: optionalValue(formData, 'project_url'),
      github_url: optionalValue(formData, 'github_url'),
      highlighted: formData.get('highlighted') === 'on',
      display_order: Number.parseInt(value(formData, 'display_order') || '0', 10) || 0,
      published: formData.get('published') === 'on',
    };

    const result = id
      ? await supabase.from('projects').update(payload).eq('id', id)
      : await supabase.from('projects').insert(payload).select('id').single();

    if (result.error) {
      throw new Error(result.error.message);
    }
    projectId = projectId || result.data?.id;
    if (!projectId) {
      throw new Error('The project was saved without an id. Try again.');
    }

    await saveGallery(supabase, projectId, slug, formData, existing?.gallery || [], uploadedGalleryPaths);

    if (uploadedImage?.path && existing?.image_path && existing.image_path !== uploadedImage.path) {
      await supabase.storage.from('project-images').remove([existing.image_path]);
    }
  } catch (error) {
    if (uploadedImage?.path) {
      await supabase.storage.from('project-images').remove([uploadedImage.path]);
    }
    if (uploadedGalleryPaths.length > 0) {
      await supabase.storage.from('project-images').remove(uploadedGalleryPaths);
    }
    redirect(`/admin/projects/${id || 'new'}?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath('/');
  revalidatePath('/projects');
  revalidatePath(`/projects/${slug}`);
  redirect('/admin?message=Project saved');
}

export async function deleteProject(formData) {
  const { supabase } = await requireAdmin();
  const id = value(formData, 'id');
  const { data: project, error: fetchError } = await supabase
    .from('projects')
    .select('image_path, gallery:project_gallery_items(image_path)')
    .eq('id', id)
    .maybeSingle();

  if (fetchError) {
    redirect(`/admin?error=${encodeURIComponent(fetchError.message)}`);
  }

  const { error } = await supabase.from('projects').delete().eq('id', id);
  if (error) {
    redirect(`/admin?error=${encodeURIComponent(error.message)}`);
  }

  if (project?.image_path) {
    await supabase.storage.from('project-images').remove([
      project.image_path,
      ...(project.gallery || []).map((item) => item.image_path).filter(Boolean),
    ]);
  } else if (project?.gallery?.length) {
    await supabase.storage.from('project-images').remove(
      project.gallery.map((item) => item.image_path).filter(Boolean),
    );
  }

  revalidatePath('/');
  revalidatePath('/projects');
  redirect('/admin?message=Project deleted');
}

export async function logout() {
  const { supabase } = await requireAdmin();
  await supabase.auth.signOut();
  redirect('/admin/login');
}