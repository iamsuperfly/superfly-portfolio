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

export async function saveProject(formData) {
  const { supabase } = await requireAdmin();
  const id = value(formData, 'id');
  const slug = value(formData, 'slug');
  const existing = id
    ? (await supabase.from('projects').select('id, image_path').eq('id', id).maybeSingle()).data
    : null;
  const imageFile = formData.get('image');
  let uploadedImage;

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
      : await supabase.from('projects').insert(payload);

    if (result.error) {
      throw new Error(result.error.message);
    }

    if (uploadedImage?.path && existing?.image_path && existing.image_path !== uploadedImage.path) {
      await supabase.storage.from('project-images').remove([existing.image_path]);
    }
  } catch (error) {
    if (uploadedImage?.path) {
      await supabase.storage.from('project-images').remove([uploadedImage.path]);
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
    .select('image_path')
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
    await supabase.storage.from('project-images').remove([project.image_path]);
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